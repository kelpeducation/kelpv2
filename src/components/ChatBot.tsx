
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles, MoreHorizontal, MessageSquarePlus, History, Trash2, ArrowLeft, MessageSquareText } from 'lucide-react';
import { sendMessage, initializeChatSession, isAPIKeyConfigured } from '@/lib/gemini';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import logo from '@/assets/logo 0.1.png';


interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

interface ChatSession {
    id: string;
    date: number; // timestamp
    preview: string;
    messages: Message[];
}

const quickReplies = [
    "What services does KELP offer?",
    "Tell me about KOEC",
    "How can I contact KELP?",
    "What are KELP's core values?"
];

// Helper to format dates
const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
};

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [view, setView] = useState<'chat' | 'history'>('chat');
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string>(Date.now().toString());

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load sessions from local storage on mount
    useEffect(() => {
        const savedSessions = localStorage.getItem('kelp_chat_sessions');
        if (savedSessions) {
            try {
                // Parse and convert date strings back to numbers/dates if needed
                const parsed = JSON.parse(savedSessions);
                // Need to fix timestamp conversion for messages if strict types
                const hydratedSessions = parsed.map((s: any) => ({
                    ...s,
                    messages: s.messages.map((m: any) => ({
                        ...m,
                        timestamp: new Date(m.timestamp)
                    }))
                }));
                setSessions(hydratedSessions);
            } catch (e) {
                console.error("Failed to load chat history", e);
            }
        }
    }, []);

    // Save sessions whenever they change
    useEffect(() => {
        if (sessions.length > 0) {
            localStorage.setItem('kelp_chat_sessions', JSON.stringify(sessions));
        }
    }, [sessions]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, view]);

    const initializeChat = () => {
        if (!isAPIKeyConfigured()) {
            setMessages([{
                id: '1',
                text: 'Hello! I\'m the KELP Ltd assistant. However, I\'m not fully configured yet. Please contact us directly for assistance.',
                sender: 'ai',
                timestamp: new Date()
            }]);
            return;
        }

        try {
            initializeChatSession();
            setMessages([{
                id: '1',
                text: 'Hello! 👋 Welcome to KELP Ltd. I\'m here to help you discover our transformative educational programs. How can I assist you today?',
                sender: 'ai',
                timestamp: new Date()
            }]);
            setIsInitialized(true);
        } catch (error) {
            setMessages([{
                id: '1',
                text: 'I apologize, but I\'m having trouble connecting. Please contact us directly at kelpeducation@gmail.com.',
                sender: 'ai',
                timestamp: new Date()
            }]);
        }
    }

    useEffect(() => {
        if (isOpen && !isInitialized && messages.length === 0) {
            initializeChat();
        }
    }, [isOpen, isInitialized, messages.length]);

    // Save current session logic
    const saveCurrentSession = () => {
        if (messages.length <= 1) return; // Don't save empty/welcome-only chats

        const session: ChatSession = {
            id: currentSessionId,
            date: Date.now(),
            preview: messages.find(m => m.sender === 'user')?.text || "New Conversation",
            messages: messages
        };

        setSessions(prev => {
            // Update existing if ID matches, else add new
            const existingIndex = prev.findIndex(s => s.id === currentSessionId);
            if (existingIndex >= 0) {
                const newSessions = [...prev];
                newSessions[existingIndex] = session;
                return newSessions;
            }
            return [session, ...prev];
        });
    };

    // Auto-save current session on message update
    useEffect(() => {
        if (messages.length > 1) {
            setSessions(prev => {
                const session: ChatSession = {
                    id: currentSessionId,
                    date: Date.now(),
                    preview: messages.find(m => m.sender === 'user')?.text || "New Conversation",
                    messages: messages
                };

                const existingIndex = prev.findIndex(s => s.id === currentSessionId);
                if (existingIndex >= 0) {
                    const newSessions = [...prev];
                    newSessions[existingIndex] = session;
                    return newSessions;
                }
                return [session, ...prev];
            });
        }
    }, [messages, currentSessionId]);


    const handleSendMessage = async (text?: string) => {
        const messageText = text || inputValue.trim();
        if (!messageText || isLoading) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            text: messageText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            // Get AI response
            const response = await sendMessage(messageText);

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: response,
                sender: 'ai',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error: any) {
            console.error('ChatBot Error Details:', error);
            let errorText = 'I apologize, but I encountered an error. Please try again or contact us at kelpeducation@gmail.com or +250 734 155 573.';

            if (error.message?.includes('API key')) {
                errorText = 'I apologize, but the chatbot is not properly configured. Please ensure the API key is set up correctly.';
            } else if (error.message?.includes('quota') || error.message?.includes('Quota')) {
                errorText = 'I apologize, but we\'ve reached our usage limit. Please try again later or contact us directly at kelpeducation@gmail.com or +250 734 155 573.';
            }

            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: errorText,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Menu Actions
    const startNewChat = () => {
        saveCurrentSession();
        setMessages([]);
        setCurrentSessionId(Date.now().toString());
        initializeChat();
        setView('chat');
    };

    const endChat = () => {
        saveCurrentSession();
        setMessages([]);
        setCurrentSessionId(Date.now().toString());
        setIsOpen(false);
        setTimeout(() => initializeChat(), 300); // Reset for next open
    };

    const loadSession = (session: ChatSession) => {
        setCurrentSessionId(session.id);
        setMessages(session.messages);
        setView('chat');
    };

    const deleteSession = (e: React.MouseEvent, sessionId: string) => {
        e.stopPropagation();
        setSessions(prev => prev.filter(s => s.id !== sessionId));
        if (currentSessionId === sessionId) {
            startNewChat();
        }
    }

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 flex items-center justify-center bg-primary text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl ${isOpen ? 'h-14 w-14 rounded-full rotate-90' : 'h-14 px-5 rounded-full'
                    }`}
                aria-label="Toggle chat"
            >
                {isOpen ? (
                    <X size={28} />
                ) : (
                    <div className="flex items-center gap-2">
                        <MessageSquareText size={20} strokeWidth={2.5} />
                        <span className="font-semibold text-lg">Chat</span>
                    </div>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[400px] max-w-[400px] animate-in slide-in-from-bottom-8 duration-300">
                    <div className="flex flex-col h-[600px] max-h-[80vh] rounded-2xl bg-white shadow-2xl overflow-hidden border border-gray-100 font-sans">
                        {/* Header */}
                        <div className="bg-primary px-6 py-4 text-white flex items-center justify-between shrink-0">
                            {view === 'history' ? (
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setView('chat')}
                                        className="p-1 hover:bg-white/10 rounded-full transition-colors"
                                    >
                                        <ArrowLeft size={20} />
                                    </button>
                                    <h3 className="font-bold text-lg">Chat History</h3>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white overflow-hidden border-2 border-white/20">
                                            <img src={typeof logo === 'string' ? logo : logo.src} alt="KELP Logo" className="h-full w-full object-cover" />
                                        </div>
                                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-primary"></span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight">KELP Assistant</h3>
                                        <p className="text-xs text-white/80">Ask me anything about KELP</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-1 items-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="rounded-full p-2 hover:bg-white/10 transition-colors focus:outline-none">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48 bg-white rounded-xl shadow-xl border-gray-100 p-1">
                                        <DropdownMenuItem onClick={startNewChat} className="flex items-center gap-2 cursor-pointer rounded-lg px-2 py-2 text-gray-700 hover:bg-primary hover:text-white focus:bg-primary focus:text-white outline-none transition-colors">
                                            <MessageSquarePlus size={16} className="text-primary group-hover:text-white" />
                                            <span>Start a new chat</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setView('history')} className="flex items-center gap-2 cursor-pointer rounded-lg px-2 py-2 text-gray-700 hover:bg-primary hover:text-white focus:bg-primary focus:text-white outline-none transition-colors">
                                            <History size={16} className="text-primary group-hover:text-white" />
                                            <span>View recent chats</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={endChat} className="flex items-center gap-2 cursor-pointer rounded-lg px-2 py-2 text-red-600 hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white outline-none transition-colors">
                                            <X size={16} />
                                            <span>End chat</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* Content Area */}
                        {view === 'history' ? (
                            <div className="flex-1 bg-white overflow-hidden flex flex-col">
                                {sessions.length === 0 ? (
                                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                                        <History size={48} className="mb-4 opacity-20" />
                                        <p>No recent chats found.</p>
                                        <Button onClick={startNewChat} variant="link" className="text-primary mt-2">
                                            Start a new conversation
                                        </Button>
                                    </div>
                                ) : (
                                    <ScrollArea className="flex-1 p-4">
                                        <div className="space-y-3">
                                            {sessions.sort((a, b) => b.date - a.date).map((session) => (
                                                <div
                                                    key={session.id}
                                                    onClick={() => loadSession(session)}
                                                    className={`group relative p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md ${currentSessionId === session.id
                                                        ? 'bg-primary/5 border-primary/20'
                                                        : 'bg-white border-gray-100 hover:border-primary/20'
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                                            {formatDate(session.date)}
                                                        </span>
                                                        <button
                                                            onClick={(e) => deleteSession(e, session.id)}
                                                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                    <p className="text-sm text-gray-600 line-clamp-2 font-medium">
                                                        {session.preview}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-2">
                                                        {session.messages.filter(m => m.sender === 'user').length} messages
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                )}
                            </div>
                        ) : (
                            // Chat View
                            <div className="flex-1 overflow-y-auto bg-[#F3F4F6] p-4 space-y-6 flex flex-col">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex w-full ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`flex max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2`}>

                                            {/* Avatar for AI only */}
                                            {message.sender === 'ai' && (
                                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden mt-1 p-1">
                                                    <img src={typeof logo === 'string' ? logo : logo.src} alt="AI" className="h-full w-full object-contain" />
                                                </div>
                                            )}

                                            <div
                                                className={`px-4 py-3 shadow-sm text-sm leading-relaxed ${message.sender === 'user'
                                                    ? 'bg-primary text-white rounded-2xl rounded-tr-sm'
                                                    : 'bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-gray-100'
                                                    }`}
                                            >
                                                <p className="whitespace-pre-wrap">{message.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex justify-start w-full">
                                        <div className="flex gap-2 max-w-[85%]">
                                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden mt-1 p-1">
                                                <img src={typeof logo === 'string' ? logo : logo.src} alt="AI" className="h-full w-full object-contain" />
                                            </div>
                                            <div className="bg-white text-gray-500 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
                                                <div className="flex gap-1">
                                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>
                        )}

                        {/* Footer / Input Area - only show in chat view */}
                        {view === 'chat' && (
                            <div className="bg-white flex-shrink-0">
                                {/* Quick Questions (Interactive Pills) */}
                                {messages.filter(m => m.sender === 'user').length === 0 && !isLoading && (
                                    <div className="px-4 pb-2 pt-2 bg-[#F3F4F6]">
                                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                                            {quickReplies.map((reply, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleSendMessage(reply)}
                                                    className="whitespace-nowrap rounded-full bg-white border border-primary/20 px-4 py-2 text-xs font-medium text-primary hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95"
                                                >
                                                    {reply}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="p-4 border-t border-gray-100">
                                    <form
                                        onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                                        className="relative flex items-center"
                                    >
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Type your message..."
                                            className="w-full rounded-xl bg-gray-50 border border-gray-200 py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="submit"
                                            disabled={!inputValue.trim() || isLoading}
                                            className="absolute right-2 p-2 rounded-lg text-primary hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                                        >
                                            <Send size={20} />
                                        </button>
                                    </form>
                                    <div className="mt-2 flex justify-center items-center gap-1">
                                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Powered by KELP AI</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Minus, Plus, ShieldCheck, Truck, CreditCard, ChevronRight } from 'lucide-react';
import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';
import { useCmsProducts } from '@/hooks/useCmsProducts';

type PaymentMethod = 'momo' | 'airtel' | 'visa' | null;

interface ProductDetailsProps {
  id?: string;
}

const ProductDetails = ({ id }: ProductDetailsProps) => {
  const containerRef = useGSAPAnimation();
  const { categories, allProducts } = useCmsProducts();

  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);

  // Find product
  const productId = typeof id === 'string' ? Number(id) : undefined;
  const product = allProducts.find(p => p.id === productId);
  const category = categories.find(c => c.id === product?.category);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center section-padding bg-slate-50">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Product Not Found</h1>
            <p className="text-muted-foreground text-sm mb-8">The learning resource you are looking for does not exist or has been removed.</p>
            <Button asChild className="bg-primary group text-white">
              <Link href="/market">
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Market
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleDecrease = () => setQuantity(prev => Math.max(1, prev - 1));
  const handleIncrease = () => setQuantity(prev => prev + 1);
  const totalPrice = product.priceValue * quantity;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main ref={containerRef} className="flex-grow bg-slate-50 pt-28 pb-20">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-muted-foreground mb-8 animate-fade-up">
            <Link href="/market" className="hover:text-primary transition-colors">Market</Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="capitalize">{category?.title || product.category}</span>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-slate-900 font-medium truncate max-w-[200px] sm:max-w-none">
              {product.title}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* ════ LEFT: Image & Details ════ */}
            <div className="lg:col-span-7 space-y-8 animate-fade-up">
              {/* Main Image */}
              <div className="bg-white rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-100">
                <div className="relative aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 group">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                      {product.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info Description */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4">About this resource</h2>
                <p className="text-slate-600 text-sm leading-relaxed lg:text-base mb-6">
                  {product.description}
                </p>
                <div className="flex items-center gap-4 py-4 border-y border-slate-100">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">KELP Quality Guarantee</h4>
                    <p className="text-sm text-muted-foreground">Premium educational content, verified by experts.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ════ RIGHT: Checkout Sidebar ════ */}
            <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 lg:sticky lg:top-32">
                
                {/* Header Info */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary/80 bg-secondary/10 px-3 py-1 rounded-full">
                      {category?.title}
                    </span>
                    <div className="flex items-center gap-1 bg-amber-50 rounded-full px-2.5 py-1">
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      <span className="text-xs font-bold text-amber-900">{product.rating}</span>
                    </div>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-2">
                    {product.title}
                  </h1>
                  <p className="text-sm lg:text-base text-accent italic font-medium">
                    &quot;{product.phrase}&quot;
                  </p>
                </div>

                <div className="text-4xl font-bold text-primary mb-8 border-b border-slate-100 pb-8">
                  {product.price}
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
                    Select Quantity
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1">
                      <button 
                        onClick={handleDecrease}
                        className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:shadow-sm hover:text-primary transition-all disabled:opacity-50"
                        disabled={quantity <= 1}
                      >
                        <Minus size={18} />
                      </button>
                      <span className="w-12 text-center font-bold text-lg text-slate-900">
                        {quantity}
                      </span>
                      <button 
                        onClick={handleIncrease}
                        className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:shadow-sm hover:text-primary transition-all"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">
                      Items selected
                    </span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
                    Payment Method
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* MoMo */}
                    <button 
                      onClick={() => setPaymentMethod('momo')}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                        paymentMethod === 'momo' 
                          ? 'border-[#ffcc00] bg-[#ffcc00]/5 shadow-md' 
                          : 'border-slate-100 hover:border-[#ffcc00]/50 bg-white'
                      }`}
                    >
                      <div className="w-12 h-12 bg-[#ffcc00] rounded-full flex items-center justify-center mb-2 shadow-sm">
                        <span className="text-[#004e76] font-black text-xs">MoMo</span>
                      </div>
                      <span className="text-xs font-bold text-slate-700">MTN Mobile</span>
                    </button>

                    {/* Airtel */}
                    <button 
                      onClick={() => setPaymentMethod('airtel')}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                        paymentMethod === 'airtel' 
                          ? 'border-[#ff0000] bg-[#ff0000]/5 shadow-md' 
                          : 'border-slate-100 hover:border-[#ff0000]/50 bg-white'
                      }`}
                    >
                      <div className="w-12 h-12 bg-[#ff0000] rounded-full flex items-center justify-center mb-2 shadow-sm">
                        <span className="text-white font-black text-xs">airtel</span>
                      </div>
                      <span className="text-xs font-bold text-slate-700">Airtel Money</span>
                    </button>

                    {/* Visa / Card */}
                    <button 
                      onClick={() => setPaymentMethod('visa')}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                        paymentMethod === 'visa' 
                          ? 'border-[#1a1f71] bg-[#1a1f71]/5 shadow-md' 
                          : 'border-slate-100 hover:border-[#1a1f71]/50 bg-white'
                      }`}
                    >
                      <div className="w-12 h-12 bg-[#1a1f71] rounded-full flex items-center justify-center mb-2 shadow-sm">
                        <CreditCard size={20} className="text-white" />
                      </div>
                      <span className="text-xs font-bold text-slate-700">Bank Card</span>
                    </button>

                  </div>

                  {/* Dynamic Payment Details Input */}
                  {paymentMethod === 'momo' || paymentMethod === 'airtel' ? (
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mt-6">
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        {paymentMethod === 'momo' ? 'MTN Mobile Money Number' : 'Airtel Money Number'}
                      </label>
                      <input 
                        type="tel" 
                        placeholder={paymentMethod === 'momo' ? "078... / 079..." : "073..."}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-green-500" /> Wait for a prompt on your phone to approve the payment.
                      </p>
                    </div>
                  ) : paymentMethod === 'visa' ? (
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mt-6 space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">Cardholder Name</label>
                        <input 
                          type="text" 
                          placeholder="Name on card"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">Card Number</label>
                        <input 
                          type="text" 
                          placeholder="0000 0000 0000 0000"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-900 mb-2">Expiry Date</label>
                          <input 
                            type="text" 
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-900 mb-2">CVC</label>
                          <input 
                            type="text" 
                            placeholder="123"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Subtotal & Checkout */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <div className="flex justify-between items-center mb-2 text-sm text-slate-600">
                    <span>Subtotal ({quantity} items)</span>
                    <span className="font-semibold text-slate-900">{product.priceValue * quantity} RWF</span>
                  </div>
                  <div className="flex justify-between items-center mb-4 text-sm text-slate-600">
                    <span>Processing Fee</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between items-end border-t border-slate-200 pt-4 mb-6">
                    <span className="font-bold text-slate-900">Total Price</span>
                    <div className="text-right">
                      <span className="block text-2xl font-black text-primary">
                        {totalPrice.toLocaleString()} RWF
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/25 hover:scale-[1.02] transition-transform duration-300"
                    disabled={!paymentMethod}
                    onClick={() => {
                      if (paymentMethod) {
                        alert(`Proceeding to ${paymentMethod.toUpperCase()} checkout for ${totalPrice.toLocaleString()} RWF`);
                      }
                    }}
                  >
                    {!paymentMethod ? 'Select Payment Method' : `Pay ${totalPrice.toLocaleString()} RWF`}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1.5">
                    <ShieldCheck size={14} className="text-green-500" />
                    Secure encrypted checkout
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;

'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface IconInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
}

const IconInput = forwardRef<HTMLInputElement, IconInputProps>(({ icon: Icon, className, ...props }, ref) => (
  <div className="relative">
    <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
    <Input ref={ref} className={cn('pl-9', className)} {...props} />
  </div>
));
IconInput.displayName = 'IconInput';

export default IconInput;

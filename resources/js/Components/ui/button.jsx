import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Konfigurasi varian button menggunakan class-variance-authority (cva)
 * Mengatur style dasar dan varian berdasarkan props variant dan size
 */
const buttonVariants = cva(
    // Style dasar untuk semua button
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md',
                outline:
                    'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
                // Varian custom
                hero: 'gradient-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]',
                success:
                    'gradient-success text-success-foreground shadow-md hover:shadow-lg',
                glass: 'glass text-foreground hover:bg-background/90',
            },
            size: {
                default: 'h-10 px-5 py-2',
                sm: 'h-9 rounded-md px-4',
                lg: 'h-12 rounded-lg px-8 text-base',
                xl: 'h-14 rounded-xl px-10 text-lg',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

/**
 * Komponen Button
 * @param {Object} props - Properti komponen
 * @param {string} props.className - Class tambahan untuk styling
 * @param {string} props.variant - Varian tampilan button (default, destructive, outline, secondary, ghost, link, hero, success, glass)
 * @param {string} props.size - Ukuran button (default, sm, lg, xl, icon)
 * @param {boolean} props.asChild - Jika true, merender elemen anak sebagai komponen utama (misal untuk Link)
 * @param {React.Ref} ref - Ref React
 */
const Button = React.forwardRef(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };

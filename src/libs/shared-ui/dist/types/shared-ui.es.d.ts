import { cn } from '../../lib/utils';
import { default as default_2 } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';

export declare const Alert: default_2.ForwardRefExoticComponent<AlertProps & default_2.RefAttributes<HTMLDivElement>>;

export declare interface AlertProps extends default_2.HTMLAttributes<HTMLDivElement> {
    variant?: 'info' | 'success' | 'warning' | 'danger';
    title?: string;
    icon?: default_2.ReactNode;
    onClose?: () => void;
}

export declare const Badge: default_2.ForwardRefExoticComponent<BadgeProps & default_2.RefAttributes<HTMLDivElement>>;

export declare interface BadgeProps extends default_2.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'sm' | 'md' | 'lg';
}

export declare const Button: default_2.ForwardRefExoticComponent<ButtonProps & default_2.RefAttributes<HTMLButtonElement>>;

export declare interface ButtonProps extends default_2.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: default_2.ReactNode;
    rightIcon?: default_2.ReactNode;
}

export declare const Card: default_2.ForwardRefExoticComponent<CardProps & default_2.RefAttributes<HTMLDivElement>>;

export declare const CardContent: default_2.ForwardRefExoticComponent<default_2.HTMLAttributes<HTMLDivElement> & default_2.RefAttributes<HTMLDivElement>>;

export declare const CardDescription: default_2.ForwardRefExoticComponent<default_2.HTMLAttributes<HTMLParagraphElement> & default_2.RefAttributes<HTMLParagraphElement>>;

export declare const CardFooter: default_2.ForwardRefExoticComponent<default_2.HTMLAttributes<HTMLDivElement> & default_2.RefAttributes<HTMLDivElement>>;

export declare const CardHeader: default_2.ForwardRefExoticComponent<default_2.HTMLAttributes<HTMLDivElement> & default_2.RefAttributes<HTMLDivElement>>;

export declare interface CardProps extends default_2.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'bordered' | 'elevated';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export declare const CardTitle: default_2.ForwardRefExoticComponent<default_2.HTMLAttributes<HTMLHeadingElement> & default_2.RefAttributes<HTMLParagraphElement>>;

export { cn }

export declare const Heading: default_2.ForwardRefExoticComponent<HeadingProps & default_2.RefAttributes<HTMLHeadingElement>>;

export declare interface HeadingProps extends default_2.HTMLAttributes<HTMLHeadingElement> {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

export declare const Input: default_2.ForwardRefExoticComponent<InputProps & default_2.RefAttributes<HTMLInputElement>>;

export declare interface InputProps extends default_2.InputHTMLAttributes<HTMLInputElement> {
    leftElement?: default_2.ReactNode;
    rightElement?: default_2.ReactNode;
    error?: string;
    hint?: string;
}

declare const Text_2: default_2.ForwardRefExoticComponent<TextProps & default_2.RefAttributes<HTMLParagraphElement>>;
export { Text_2 as Text }

export declare interface TextProps extends default_2.HTMLAttributes<HTMLParagraphElement> {
    variant?: 'body' | 'lead' | 'small' | 'muted';
    as?: 'p' | 'div' | 'span';
}

export declare const ThemeToggle: () => JSX_2.Element;

export { }

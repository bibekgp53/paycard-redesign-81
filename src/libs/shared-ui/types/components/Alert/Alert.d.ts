import { default as React } from 'react';
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'info' | 'success' | 'warning' | 'danger';
    title?: string;
    icon?: React.ReactNode;
    onClose?: () => void;
}
export declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;

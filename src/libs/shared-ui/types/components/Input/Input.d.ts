import { default as React } from 'react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
    error?: string;
    hint?: string;
}
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

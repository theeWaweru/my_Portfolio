// app/components/ui/Button.jsx

import React from 'react';
import Link from 'next/link';

const Button = ({
    children,
    href,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    disabled = false,
    type = 'button',
    fullWidth = false,
    icon,
    iconPosition = 'right',
    isLoading = false,
    ...props
}) => {
    // Variant styles
    const variantStyles = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-800 hover:bg-gray-700 text-white',
        outline: 'border border-white hover:border-blue-500 hover:text-blue-400 bg-transparent',
        ghost: 'bg-transparent hover:bg-gray-800 text-white',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
    };

    // Size styles
    const sizeStyles = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3',
        lg: 'px-8 py-4 text-lg',
    };

    // Shape styles (can be added to className as needed)
    // 'rounded-full' or 'rounded-lg'

    // Base styles
    const baseStyles = 'font-medium transition-all duration-300 flex items-center justify-center';

    // Combined styles
    const buttonStyles = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${fullWidth ? 'w-full' : ''} 
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} 
    ${className}
  `;

    // Loading state
    const loadingSpinner = (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    );

    // Icon rendering
    const iconElement = icon && (
        <span className={`${iconPosition === 'left' ? 'mr-2' : 'ml-2'}`}>
            {icon}
        </span>
    );

    // Render as link if href is provided
    if (href) {
        return (
            <Link
                href={href}
                className={buttonStyles}
                {...props}
            >
                {isLoading && loadingSpinner}
                {iconPosition === 'left' && iconElement}
                {children}
                {iconPosition === 'right' && iconElement}
            </Link>
        );
    }

    // Otherwise render as button
    return (
        <button
            type={type}
            className={buttonStyles}
            onClick={onClick}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && loadingSpinner}
            {iconPosition === 'left' && iconElement}
            {children}
            {iconPosition === 'right' && iconElement}
        </button>
    );
};

export default Button;
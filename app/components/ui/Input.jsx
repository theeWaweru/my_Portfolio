// app/components/ui/Input.jsx

import React, { forwardRef } from 'react';

const Input = forwardRef(({
    label,
    type = 'text',
    name,
    id,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    helper,
    className = '',
    required = false,
    disabled = false,
    fullWidth = true,
    icon,
    iconPosition = 'left',
    ...props
}, ref) => {
    // Generate a unique ID if not provided
    const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

    // Base styles
    const baseInputStyles = "px-4 py-2 bg-gray-800 border rounded-lg focus:ring-2 transition-colors";

    // State-based styles
    const stateStyles = error
        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
        : "border-gray-700 focus:ring-blue-500 focus:border-blue-500";

    // Icon styles
    const iconInputStyles = icon
        ? iconPosition === 'left' ? 'pl-10' : 'pr-10'
        : '';

    // Combined styles
    const inputStyles = `
    ${baseInputStyles} 
    ${stateStyles} 
    ${iconInputStyles} 
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''} 
    ${fullWidth ? 'w-full' : ''} 
    ${className}
  `;

    return (
        <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
            {/* Label */}
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            {/* Input with icon */}
            <div className="relative">
                {icon && iconPosition === 'left' && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        {icon}
                    </div>
                )}

                <input
                    ref={ref}
                    type={type}
                    id={inputId}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    className={inputStyles}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined}
                    {...props}
                />

                {icon && iconPosition === 'right' && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                        {icon}
                    </div>
                )}
            </div>

            {/* Error message */}
            {error && (
                <p id={`${inputId}-error`} className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}

            {/* Helper text */}
            {!error && helper && (
                <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-400">
                    {helper}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
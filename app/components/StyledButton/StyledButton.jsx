// app/components/StyledButton/StyledButton.jsx
import Link from 'next/link';
import styles from './StyledButton.module.css';

const StyledButton = ({
    children,
    href,
    onClick,
    type = 'button',
    size = 'large', // Default to large
    disabled = false,
    className = '',
    ...rest
}) => {
    // Button classes
    const buttonClasses = [
        styles.button,
        styles[size], // Add size-specific class
        disabled && styles.disabled,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    // If href is provided, render as Link
    if (href) {
        return (
            <Link href={href} className={buttonClasses} {...rest}>
                {children}
            </Link>
        );
    }

    // Otherwise render as button
    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    );
};

export default StyledButton;
// app/components/Button/Button.jsx
import Link from 'next/link';
import styles from './Button.module.css';

const Button = ({
    children,
    href,
    onClick,
    type = 'button',
    variant = 'primary',
    size,
    fullWidth,
    disabled,
    className = '',
    ...rest
}) => {
    const buttonClasses = [
        styles.button,
        styles[variant],
        size && styles[size],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    if (href) {
        return (
            <Link href={href} className={buttonClasses} {...rest}>
                {children}
            </Link>
        );
    }

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

export default Button;
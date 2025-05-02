// app/components/ui/Card.jsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Card = ({
    title,
    description,
    image,
    imageAlt,
    href,
    tags,
    footer,
    onClick,
    className = '',
    aspectRatio = 'aspect-video',
    hoverEffect = true,
    imagePosition = 'top',
    children
}) => {
    // Base card styles
    const cardStyles = `
    bg-gray-900 rounded-xl overflow-hidden transition-all duration-300
    ${hoverEffect ? 'hover:shadow-lg hover:shadow-blue-900/20 hover:translate-y-[-4px]' : ''}
    ${className}
  `;

    // Card content wrapper
    const ContentWrapper = ({ children }) => {
        if (href) {
            return (
                <Link href={href} className="block h-full">
                    {children}
                </Link>
            );
        }

        if (onClick) {
            return (
                <div
                    className="h-full cursor-pointer"
                    onClick={onClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onClick()}
                >
                    {children}
                </div>
            );
        }

        return <div className="h-full">{children}</div>;
    };

    return (
        <div className={cardStyles}>
            <ContentWrapper>
                {/* Card Image - Top Position */}
                {image && imagePosition === 'top' && (
                    <div className={`relative ${aspectRatio} w-full overflow-hidden`}>
                        <Image
                            src={image}
                            alt={imageAlt || title || 'Card image'}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                )}

                {/* Card Content */}
                <div className="p-6">
                    {/* Tags */}
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    {title && (
                        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                            {title}
                        </h3>
                    )}

                    {/* Description */}
                    {description && (
                        <p className="text-gray-400 mb-4 line-clamp-3">
                            {description}
                        </p>
                    )}

                    {/* Children content */}
                    {children}

                    {/* Card Image - Bottom Position */}
                    {image && imagePosition === 'bottom' && (
                        <div className={`relative ${aspectRatio} w-full overflow-hidden mt-4`}>
                            <Image
                                src={image}
                                alt={imageAlt || title || 'Card image'}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    )}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="px-6 py-4 border-t border-gray-800">
                        {footer}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Card;
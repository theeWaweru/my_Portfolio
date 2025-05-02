// app/components/MarkdownRenderer.jsx
"use client";
import { useEffect, useState } from 'react';
import styles from './MarkdownRenderer.module.css';

const MarkdownRenderer = ({ content, className = '' }) => {
    const [html, setHtml] = useState('');

    useEffect(() => {
        // More comprehensive markdown to HTML conversion
        const renderMarkdown = () => {
            if (!content) {
                setHtml('');
                return;
            }

            let renderedHtml = content;

            // Process code blocks first (they might contain markdown syntax)
            renderedHtml = renderedHtml.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');

            // Process inline code
            renderedHtml = renderedHtml.replace(/`([^`]+)`/g, '<code>$1</code>');

            // Process headers
            renderedHtml = renderedHtml.replace(/^### (.*$)/gm, '<h3>$1</h3>');
            renderedHtml = renderedHtml.replace(/^## (.*$)/gm, '<h2>$1</h2>');
            renderedHtml = renderedHtml.replace(/^# (.*$)/gm, '<h1>$1</h1>');

            // Process paragraphs
            renderedHtml = renderedHtml.split('\n\n').map(paragraph => {
                if (
                    !paragraph.startsWith('<h1>') &&
                    !paragraph.startsWith('<h2>') &&
                    !paragraph.startsWith('<h3>') &&
                    !paragraph.startsWith('<ul>') &&
                    !paragraph.startsWith('<ol>') &&
                    !paragraph.startsWith('<blockquote>') &&
                    !paragraph.startsWith('<pre>') &&
                    paragraph.trim() !== ''
                ) {
                    return `<p>${paragraph}</p>`;
                }
                return paragraph;
            }).join('\n\n');

            // Process bold and italic
            renderedHtml = renderedHtml.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            renderedHtml = renderedHtml.replace(/\*(.*?)\*/g, '<em>$1</em>');

            // Process links
            renderedHtml = renderedHtml.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

            // Process images
            renderedHtml = renderedHtml.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');

            // Process horizontal rules
            renderedHtml = renderedHtml.replace(/^\-\-\-$/gm, '<hr>');

            // Process lists
            // First unordered lists
            let listMatches = renderedHtml.match(/^[\s]*[\-\*][\s]+(.*?)$(?:\n[\s]*[\-\*][\s]+(.*?)$)*/gm);
            if (listMatches) {
                listMatches.forEach(match => {
                    const listItems = match.split('\n').map(item => {
                        const content = item.replace(/^[\s]*[\-\*][\s]+(.*)$/, '$1');
                        return `<li>${content}</li>`;
                    }).join('');

                    renderedHtml = renderedHtml.replace(match, `<ul>${listItems}</ul>`);
                });
            }

            // Then ordered lists
            listMatches = renderedHtml.match(/^[\s]*\d+\.[\s]+(.*?)$(?:\n[\s]*\d+\.[\s]+(.*?)$)*/gm);
            if (listMatches) {
                listMatches.forEach(match => {
                    const listItems = match.split('\n').map(item => {
                        const content = item.replace(/^[\s]*\d+\.[\s]+(.*)$/, '$1');
                        return `<li>${content}</li>`;
                    }).join('');

                    renderedHtml = renderedHtml.replace(match, `<ol>${listItems}</ol>`);
                });
            }

            // Process blockquotes
            let blockquoteMatches = renderedHtml.match(/^>[\s]+(.*?)$(?:\n>[\s]+(.*?)$)*/gm);
            if (blockquoteMatches) {
                blockquoteMatches.forEach(match => {
                    const content = match.split('\n').map(line => {
                        return line.replace(/^>[\s]+(.*)$/, '$1');
                    }).join('<br>');

                    renderedHtml = renderedHtml.replace(match, `<blockquote>${content}</blockquote>`);
                });
            }

            // Replace line breaks that aren't part of blocks
            renderedHtml = renderedHtml.replace(/([^>])\n([^<])/g, '$1<br>$2');

            setHtml(renderedHtml);
        };

        renderMarkdown();
    }, [content]);

    return (
        <div
            className={`${styles.markdown} ${className}`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};

export default MarkdownRenderer;
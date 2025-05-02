// app/components/admin/MarkdownEditor.jsx
"use client";
import { useState, useEffect } from 'react';
import styles from './MarkdownEditor.module.css';

const MarkdownEditor = ({
    value,
    onChange,
    rows = 10,
    placeholder = 'Write your content here...',
    preview = true,
    className = '',
}) => {
    const [content, setContent] = useState(value || '');
    const [showPreview, setShowPreview] = useState(false);
    const [previewContent, setPreviewContent] = useState('');

    useEffect(() => {
        setContent(value || '');
    }, [value]);

    // Basic markdown to HTML conversion for preview
    const markdownToHtml = (markdown) => {
        if (!markdown) return '';

        // Convert headers
        let html = markdown
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^# (.*$)/gm, '<h1>$1</h1>');

        // Convert paragraphs - detect paragraphs by looking for line breaks followed by text
        html = html.replace(/\n\n([^#\-\*\n].*)/g, '\n\n<p>$1</p>');

        // Convert bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Convert italic
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Convert links
        html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

        // Convert unordered lists
        html = html.replace(/^\* (.*$)/gm, '<li>$1</li>');
        html = html.replace(/<\/li>\n<li>/g, '</li>\n<li>');
        html = html.replace(/<li>(.*)<\/li>/g, '<ul>\n<li>$1</li>\n</ul>');

        // Convert ordered lists
        html = html.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');
        html = html.replace(/<\/li>\n<li>/g, '</li>\n<li>');
        html = html.replace(/<li>(.*)<\/li>/g, '<ol>\n<li>$1</li>\n</ol>');

        // Convert images
        html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%;">');

        // Convert line breaks
        html = html.replace(/\n/g, '<br>');

        return html;
    };

    const handleChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent);
        onChange(newContent);

        if (preview) {
            setPreviewContent(markdownToHtml(newContent));
        }
    };

    const togglePreview = () => {
        if (!showPreview) {
            setPreviewContent(markdownToHtml(content));
        }
        setShowPreview(!showPreview);
    };

    const insertMarkdown = (type) => {
        const textarea = document.getElementById('markdown-editor');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);

        let insertion = '';
        let newCursorPos = start;

        switch (type) {
            case 'bold':
                insertion = `**${selectedText || 'bold text'}**`;
                newCursorPos = start + 2;
                break;
            case 'italic':
                insertion = `*${selectedText || 'italic text'}*`;
                newCursorPos = start + 1;
                break;
            case 'h1':
                insertion = `\n# ${selectedText || 'Heading 1'}\n`;
                newCursorPos = selectedText ? start + 3 : start + 3;
                break;
            case 'h2':
                insertion = `\n## ${selectedText || 'Heading 2'}\n`;
                newCursorPos = selectedText ? start + 4 : start + 4;
                break;
            case 'h3':
                insertion = `\n### ${selectedText || 'Heading 3'}\n`;
                newCursorPos = selectedText ? start + 5 : start + 5;
                break;
            case 'link':
                insertion = `[${selectedText || 'link text'}](https://example.com)`;
                newCursorPos = selectedText ? end + 1 : start + 1;
                break;
            case 'image':
                insertion = `![${selectedText || 'alt text'}](https://example.com/image.jpg)`;
                newCursorPos = selectedText ? end + 2 : start + 2;
                break;
            case 'list':
                insertion = `\n* ${selectedText || 'List item'}\n* Another item\n* And another\n`;
                newCursorPos = selectedText ? start + 3 : start + 3;
                break;
            case 'olist':
                insertion = `\n1. ${selectedText || 'List item'}\n2. Another item\n3. And another\n`;
                newCursorPos = selectedText ? start + 4 : start + 4;
                break;
            default:
                return;
        }

        const newContent = content.substring(0, start) + insertion + content.substring(end);
        setContent(newContent);
        onChange(newContent);

        // Restore focus and set cursor position
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
                selectedText ? start : newCursorPos,
                selectedText ? (start + insertion.length) : (newCursorPos + (selectedText || type === 'bold' ? 'bold text' : type === 'italic' ? 'italic text' : type === 'h1' ? 'Heading 1' : type === 'h2' ? 'Heading 2' : type === 'h3' ? 'Heading 3' : type === 'link' ? 'link text' : type === 'image' ? 'alt text' : 'List item').length)
            );
        }, 0);
    };

    return (
        <div className={`${styles.editor} ${className}`}>
            <div className={styles.toolbar}>
                <button type="button" onClick={() => insertMarkdown('bold')} className={styles.toolbarButton} title="Bold">
                    <strong>B</strong>
                </button>
                <button type="button" onClick={() => insertMarkdown('italic')} className={styles.toolbarButton} title="Italic">
                    <em>I</em>
                </button>
                <button type="button" onClick={() => insertMarkdown('h1')} className={styles.toolbarButton} title="Heading 1">
                    H1
                </button>
                <button type="button" onClick={() => insertMarkdown('h2')} className={styles.toolbarButton} title="Heading 2">
                    H2
                </button>
                <button type="button" onClick={() => insertMarkdown('h3')} className={styles.toolbarButton} title="Heading 3">
                    H3
                </button>
                <button type="button" onClick={() => insertMarkdown('link')} className={styles.toolbarButton} title="Link">
                    🔗
                </button>
                <button type="button" onClick={() => insertMarkdown('image')} className={styles.toolbarButton} title="Image">
                    🖼️
                </button>
                <button type="button" onClick={() => insertMarkdown('list')} className={styles.toolbarButton} title="Bullet List">
                    •
                </button>
                <button type="button" onClick={() => insertMarkdown('olist')} className={styles.toolbarButton} title="Numbered List">
                    1.
                </button>
                {preview && (
                    <button
                        type="button"
                        onClick={togglePreview}
                        className={`${styles.toolbarButton} ${styles.previewButton} ${showPreview ? styles.active : ''}`}
                        title="Toggle Preview"
                    >
                        👁️
                    </button>
                )}
            </div>

            <div className={styles.contentArea}>
                <textarea
                    id="markdown-editor"
                    className={`${styles.textarea} ${showPreview ? styles.hidden : ''}`}
                    value={content}
                    onChange={handleChange}
                    rows={rows}
                    placeholder={placeholder}
                />

                {preview && showPreview && (
                    <div
                        className={styles.preview}
                        dangerouslySetInnerHTML={{ __html: previewContent }}
                    />
                )}
            </div>

            <div className={styles.footer}>
                <div className={styles.wordCount}>
                    {content.split(/\s+/).filter(Boolean).length} words
                </div>
                <a
                    href="https://www.markdownguide.org/cheat-sheet/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.markdownHelp}
                >
                    Markdown Help
                </a>
            </div>
        </div>
    );
};

export default MarkdownEditor;
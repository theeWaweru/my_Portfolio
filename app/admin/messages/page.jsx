// app/admin/messages/page.jsx
"use client";
import { useState, useEffect } from 'react';
import styles from './messages.module.css';
import { getMessages } from '../../lib/supabase/messages';

export default function MessagesAdmin() {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadMessages() {
            setIsLoading(true);
            try {
                const { data, error } = await getMessages();

                if (error) throw error;

                setMessages(data || []);
            } catch (err) {
                console.error('Error loading messages:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        loadMessages();
    }, []);

    const handleMessageClick = (message) => {
        // Mark message as read (implement this later if needed)
        setSelectedMessage(message);
    };

    const handleCloseMessage = () => {
        setSelectedMessage(null);
    };

    const handleDeleteMessage = async (id) => {
        try {
            const { error } = await deleteMessage(id);

            if (error) throw error;

            setMessages(messages.filter(message => message.id !== id));

            if (selectedMessage && selectedMessage.id === id) {
                setSelectedMessage(null);
            }
        } catch (err) {
            console.error('Error deleting message:', err);
            alert('Failed to delete message');
        }
    };

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <p>Loading messages...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.error}>
                <p>Error loading messages: {error}</p>
            </div>
        );
    }

    return (
        <div className={styles.messagesAdmin}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Messages</h1>
            </div>

            <div className={styles.messagesContainer}>
                <div className={styles.messagesList}>
                    {messages.length === 0 ? (
                        <div className={styles.noMessages}>
                            <p>No messages to display</p>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div
                                key={message.id}
                                className={`${styles.messageItem} ${!message.read ? styles.unread : ''} ${selectedMessage && selectedMessage.id === message.id ? styles.active : ''}`}
                                onClick={() => handleMessageClick(message)}
                            >
                                <div className={styles.messageHeader}>
                                    <h3 className={styles.messageName}>{message.name}</h3>
                                    <span className={styles.messageDate}>
                                        {new Date(message.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className={styles.messageSubject}>{message.subject}</p>
                                <p className={styles.messagePreview}>
                                    {message.message.substring(0, 90)}
                                    {message.message.length > 90 ? '...' : ''}
                                </p>
                            </div>
                        ))
                    )}
                </div>

                <div className={styles.messageDetail}>
                    {selectedMessage ? (
                        <div className={styles.messageContent}>
                            <div className={styles.messageDetailHeader}>
                                <h2 className={styles.messageDetailTitle}>{selectedMessage.subject}</h2>
                                <button
                                    className={styles.closeButton}
                                    onClick={handleCloseMessage}
                                >
                                    ×
                                </button>
                            </div>
                            <div className={styles.messageDetailInfo}>
                                <div className={styles.messageDetailSender}>
                                    <span className={styles.messageDetailLabel}>From:</span>
                                    <span>{selectedMessage.name} &lt;{selectedMessage.email}&gt;</span>
                                </div>
                                <div className={styles.messageDetailDate}>
                                    <span className={styles.messageDetailLabel}>Date:</span>
                                    <span>{new Date(selectedMessage.created_at).toLocaleString()}</span>
                                </div>
                            </div>
                            <div className={styles.messageDetailBody}>
                                {selectedMessage.message.split("\n").map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                            <div className={styles.messageActions}>
                                <a
                                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                    className={styles.replyButton}
                                >
                                    Reply
                                </a>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.noMessageSelected}>
                            <p>Select a message to view its contents</p>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}
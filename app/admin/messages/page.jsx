// app/admin/messages/page.jsx
"use client";
import { useState } from 'react';
import styles from './messages.module.css';

export default function MessagesAdmin() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            subject: 'Project Inquiry',
            message: 'Hi David, Im interested in working together on a new fintech project.Were looking for someone with your skills to help us design and develop a new mobile banking app. Would you be available for a call next week to discuss details?',
            date: 'May 1, 2025',
            read: false
        },
        {
            id: 2,
            name: 'Sarah Smith',
            email: 'sarah.smith@example.com',
            subject: 'Freelance Opportunity',
            message: 'I love your portfolio! Would you be available for a freelance project starting next month? We need help redesigning our company website and improving the user experience. Looking forward to hearing from you!',
            date: 'April 28, 2025',
            read: true
        },
        {
            id: 3,
            name: 'Michael Johnson',
            email: 'michael.j@example.com',
            subject: 'Speaking Opportunity',
            message: 'Hello David, We are organizing a tech conference in Nairobi this August and would love to have you as a speaker to talk about UX design best practices. Please let me know if youre interested and available.',
      date: 'April 25, 2025',
            read: true
        }
    ]);

    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleMessageClick = (message) => {
        // Mark message as read
        if (!message.read) {
            const updatedMessages = messages.map(m =>
                m.id === message.id ? { ...m, read: true } : m
            );
            setMessages(updatedMessages);
        }

        setSelectedMessage(message);
    };

    const handleCloseMessage = () => {
        setSelectedMessage(null);
    };

    const handleDeleteMessage = (id) => {
        const updatedMessages = messages.filter(message => message.id !== id);
        setMessages(updatedMessages);

        if (selectedMessage && selectedMessage.id === id) {
            setSelectedMessage(null);
        }
    };

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
                                    <span className={styles.messageDate}>{message.date}</span>
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
                                    <span>{selectedMessage.date}</span>
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
        </div>
    );
}
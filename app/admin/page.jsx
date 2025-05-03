// app/admin/page.jsx
"use client";

import { useState, useEffect } from 'react';
import styles from './page.module.css';

// Import necessary functions
import { getProjects } from '../lib/supabase/projects';
import { getBlogPosts } from '../lib/supabase/blog';
import { getMessages } from '../lib/supabase/messages';

export default function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState({
        projects: {
            count: 0,
            loading: true,
            error: null
        },
        blogPosts: {
            count: 0,
            loading: true,
            error: null
        },
        messages: {
            count: 0,
            loading: true,
            error: null,
            recentMessages: []
        },
        recentActivity: []
    });

    useEffect(() => {
        async function loadDashboardData() {
            // Fetch projects count
            try {
                const { data: projectsData, error: projectsError } = await getProjects();
                setDashboardData(prev => ({
                    ...prev,
                    projects: {
                        count: projectsData?.length || 0,
                        loading: false,
                        error: projectsError
                    }
                }));

                // Add to recent activity if there are projects
                if (projectsData && projectsData.length > 0) {
                    const latestProject = projectsData[0];
                    addToRecentActivity({
                        type: 'project',
                        text: `Updated project: "${latestProject.title}"`,
                        date: new Date(latestProject.updated_at || latestProject.created_at)
                    });
                }
            } catch (error) {
                console.error('Error loading projects:', error);
                setDashboardData(prev => ({
                    ...prev,
                    projects: {
                        count: 0,
                        loading: false,
                        error: error.message
                    }
                }));
            }

            // Fetch blog posts count
            try {
                const { data: blogData, error: blogError } = await getBlogPosts();
                setDashboardData(prev => ({
                    ...prev,
                    blogPosts: {
                        count: blogData?.length || 0,
                        loading: false,
                        error: blogError
                    }
                }));

                // Add to recent activity if there are blog posts
                if (blogData && blogData.length > 0) {
                    const latestPost = blogData[0];
                    addToRecentActivity({
                        type: 'blog',
                        text: `New blog post published: "${latestPost.title}"`,
                        date: new Date(latestPost.published_date || latestPost.created_at)
                    });
                }
            } catch (error) {
                console.error('Error loading blog posts:', error);
                setDashboardData(prev => ({
                    ...prev,
                    blogPosts: {
                        count: 0,
                        loading: false,
                        error: error.message
                    }
                }));
            }

            // Fetch messages
            try {
                const { data: messagesData, error: messagesError } = await getMessages();

                // Get recent messages (up to 5)
                const recentMessages = messagesData
                    ? messagesData.slice(0, 5).map(msg => ({
                        id: msg.id,
                        name: msg.name,
                        email: msg.email,
                        subject: msg.subject || '',
                        message: msg.message,
                        date: new Date(msg.created_at),
                        read: msg.read
                    }))
                    : [];

                setDashboardData(prev => ({
                    ...prev,
                    messages: {
                        count: messagesData?.length || 0,
                        loading: false,
                        error: messagesError,
                        recentMessages
                    }
                }));

                // Add to recent activity if there are messages
                if (messagesData && messagesData.length > 0) {
                    const latestMessage = messagesData[0];
                    addToRecentActivity({
                        type: 'message',
                        text: `New message from ${latestMessage.name}`,
                        date: new Date(latestMessage.created_at)
                    });
                }
            } catch (error) {
                console.error('Error loading messages:', error);
                setDashboardData(prev => ({
                    ...prev,
                    messages: {
                        count: 0,
                        loading: false,
                        error: error.message,
                        recentMessages: []
                    }
                }));
            }
        }

        function addToRecentActivity(activity) {
            setDashboardData(prev => {
                const newActivity = [...prev.recentActivity, activity];

                // Sort by date (newest first) and limit to 5 items
                const sortedActivity = newActivity
                    .sort((a, b) => b.date - a.date)
                    .slice(0, 5);

                return {
                    ...prev,
                    recentActivity: sortedActivity
                };
            });
        }

        loadDashboardData();
    }, []);

    // Format date as relative time (e.g., "2 days ago")
    const formatRelativeTime = (date) => {
        if (!date) return '';

        const now = new Date();
        const diffMs = now - date;
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        const diffWeeks = Math.floor(diffDays / 7);

        if (diffDays < 1) {
            if (diffHours < 1) {
                if (diffMinutes < 1) {
                    return 'Just now';
                }
                return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
            }
            return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
        } else if (diffDays < 7) {
            return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
        } else if (diffWeeks < 4) {
            return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    return (<div className={styles.dashboard}>
        <h1 className={styles.pageTitle}>Dashboard</h1>

        <div className={styles.statsGrid}>
            <div className={styles.statCard}>
                <h3>Projects</h3>
                <p className={styles.statNumber}>
                    {dashboardData.projects.loading ? 'Loading...' : dashboardData.projects.count}
                </p>
                {dashboardData.projects.error && (
                    <p className={styles.errorText}>{dashboardData.projects.error}</p>
                )}
            </div>
            <div className={styles.statCard}>
                <h3>Blog Posts</h3>
                <p className={styles.statNumber}>
                    {dashboardData.blogPosts.loading ? 'Loading...' : dashboardData.blogPosts.count}
                </p>
                {dashboardData.blogPosts.error && (
                    <p className={styles.errorText}>{dashboardData.blogPosts.error}</p>
                )}
            </div>
            <div className={styles.statCard}>
                <h3>Messages</h3>
                <p className={styles.statNumber}>
                    {dashboardData.messages.loading ? 'Loading...' : dashboardData.messages.count}
                </p>
                {dashboardData.messages.error && (
                    <p className={styles.errorText}>{dashboardData.messages.error}</p>
                )}
            </div>
        </div>

        <div className={styles.recentSection}>
            <h2>Recent Messages</h2>
            <div className={styles.recentMessages}>
                {dashboardData.messages.loading ? (
                    <p>Loading messages...</p>
                ) : dashboardData.messages.recentMessages.length > 0 ? (
                    dashboardData.messages.recentMessages.map((message, index) => (
                        <div key={message.id || index} className={styles.messageCard}>
                            <h3>{message.name}</h3>
                            <p className={styles.messageDate}>{formatRelativeTime(message.date)}</p>
                            <p className={styles.messageExcerpt}>
                                {message.message.substring(0, 100)}{message.message.length > 100 ? '...' : ''}
                            </p>
                            <a href={`/admin/messages?id=${message.id}`} className={styles.viewButton}>
                                View Message
                            </a>
                        </div>
                    ))
                ) : (
                    <p>No messages yet</p>
                )}
            </div>
        </div>

        <div className={styles.recentSection}>
            <h2>Recent Activity</h2>
            <ul className={styles.activityList}>
                {dashboardData.recentActivity.length > 0 ? (
                    dashboardData.recentActivity.map((activity, index) => (
                        <li key={index} className={styles.activityItem}>
                            <span className={styles.activityDate}>
                                {formatRelativeTime(activity.date)}
                            </span>
                            <span className={styles.activityDetail}>
                                {activity.text}
                            </span>
                        </li>
                    ))
                ) : (
                    <li className={styles.activityItem}>
                        <span className={styles.activityDetail}>No recent activity</span>
                    </li>
                )}
            </ul>
        </div>
    </div>
    );
}
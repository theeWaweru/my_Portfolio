// app/components/contact/ContactForm.jsx

import React, { useState } from 'react';
import Button from '../ui/Button';

const ContactForm = ({ onSubmit }) => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        inquiryType: 'Project',
        message: '',
        referral: ''
    });

    const [formStatus, setFormStatus] = useState({
        isSubmitting: false,
        isSuccess: false,
        isError: false,
        message: ''
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset form status
        setFormStatus({
            isSubmitting: true,
            isSuccess: false,
            isError: false,
            message: ''
        });

        try {
            // Validate form
            if (!formState.name || !formState.email || !formState.message) {
                throw new Error('Please fill out all required fields.');
            }

            // Submit form data
            if (typeof onSubmit === 'function') {
                await onSubmit(formState);
            }

            // Success message
            setFormStatus({
                isSubmitting: false,
                isSuccess: true,
                isError: false,
                message: 'Thanks for reaching out! I\'ll get back to you within 48 hours.'
            });

            // Reset form
            setFormState({
                name: '',
                email: '',
                inquiryType: 'Project',
                message: '',
                referral: ''
            });
        } catch (error) {
            // Error message
            setFormStatus({
                isSubmitting: false,
                isSuccess: false,
                isError: true,
                message: error.message || 'Something went wrong. Please try again later.'
            });
        }
    };

    return (
        <div className="bg-gray-900 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

            {/* Success Message */}
            {formStatus.isSuccess && (
                <div className="bg-green-900/30 border border-green-500 text-green-300 px-4 py-3 rounded-lg mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium">{formStatus.message}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {formStatus.isError && (
                <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium">{formStatus.message}</p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Your name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="your.email@example.com"
                            required
                        />
                    </div>

                    {/* Inquiry Type */}
                    <div>
                        <label htmlFor="inquiryType" className="block text-sm font-medium mb-2">
                            Type of Inquiry
                        </label>
                        <select
                            id="inquiryType"
                            name="inquiryType"
                            value={formState.inquiryType}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                            <option value="Project">Project Inquiry</option>
                            <option value="Collaboration">Collaboration</option>
                            <option value="Job">Job Opportunity</option>
                            <option value="General">General Message</option>
                        </select>
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                            Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            rows="5"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Tell me about your project, questions, or just say hello..."
                            required
                        ></textarea>
                    </div>

                    {/* Referral */}
                    <div>
                        <label htmlFor="referral" className="block text-sm font-medium mb-2">
                            How did you find me? (Optional)
                        </label>
                        <input
                            type="text"
                            id="referral"
                            name="referral"
                            value={formState.referral}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Google, LinkedIn, Referral, etc."
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            isLoading={formStatus.isSubmitting}
                            disabled={formStatus.isSubmitting}
                        >
                            {formStatus.isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
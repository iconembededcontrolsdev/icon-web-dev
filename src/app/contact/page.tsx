'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', category: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-bg pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-primary hover:text-accent transition-colors font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Contact Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-card rounded-[40px] shadow-lg p-8 sm:p-12 lg:p-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-muted">
              Get in touch with us for any inquiries or support
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Message Sent!</h3>
              <p className="text-muted">We&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-primary bg-card"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-primary bg-card"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-primary mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-primary bg-white"
                >
                  <option value="" className="text-gray-400">Select a category</option>
                  <option value="general" className="text-primary">General Inquiry</option>
                  <option value="product" className="text-primary">Product Information</option>
                  <option value="support" className="text-primary">Technical Support</option>
                  <option value="sales" className="text-primary">Sales</option>
                  <option value="other" className="text-primary">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-none text-primary bg-card"
                  placeholder="Enter your message or enquiry"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    }>
      <ContactForm />
    </Suspense>
  );
}

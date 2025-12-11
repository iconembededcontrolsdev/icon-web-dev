'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { countryCodes } from '@/data/countryCodes';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    category: '',
    message: ''
  });
  const [contactMethod, setContactMethod] = useState<'phone' | 'email'>('email');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setError('');

    // Phone validation
    if (!/^\d{7,15}$/.test(formData.phone)) {
      setError('Please enter a valid phone number (7-15 digits)');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', countryCode: '+91', phone: '', category: '', message: '' });
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData({
      ...formData,
      phone: value
    });
  };


  return (
    <div className="min-h-screen bg-background pt-12">
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
          {/* Branding Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative h-16 w-auto">
                <Image
                  src="/images/lowres/Logos/logo.png"
                  alt="Icon Embedded Controls"
                  width={120}
                  height={48}
                  className="object-contain"
                />
              </div>
            </div>
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
              {/* Contact Method Selection */}
              <div className="bg-primary/5 p-4 rounded-xl border-2 border-primary/20 mb-4">
                <p className="text-sm font-semibold text-primary mb-3">How would you like us to contact you?</p>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      checked={contactMethod === 'email'}
                      onChange={(e) => setContactMethod(e.target.value as 'email' | 'phone')}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="ml-2 text-foreground">Via Email</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="phone"
                      checked={contactMethod === 'phone'}
                      onChange={(e) => setContactMethod(e.target.value as 'email' | 'phone')}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="ml-2 text-foreground">Via Phone</span>
                  </label>
                </div>
              </div>

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
                  className="w-full px-4 py-3 border-2 border-border rounded-xl bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm placeholder:text-muted"
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
                  className="w-full px-4 py-3 border-2 border-border rounded-xl bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm placeholder:text-muted"
                  placeholder="Enter your email"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label htmlFor="countryCode" className="block text-sm font-semibold text-primary mb-2">
                    Country Code
                  </label>
                  <select
                    id="countryCode"
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-border rounded-xl bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm cursor-pointer appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234f8fff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25rem 1.25rem',
                      paddingRight: '2.5rem'
                    }}
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.dial_code} className="bg-card text-foreground">
                        {country.name} ({country.dial_code})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-semibold text-primary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="w-full px-4 py-3 border-2 border-border rounded-xl bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm placeholder:text-muted"
                    placeholder="Enter your phone number"
                  />
                </div>
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
                  className="w-full px-4 py-3 border-2 border-border rounded-xl bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm cursor-pointer appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234f8fff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.25rem 1.25rem',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="" className="bg-card text-muted">Select a category</option>
                  <option value="general" className="bg-card text-foreground">General Inquiry</option>
                  <option value="product" className="bg-card text-foreground">Product Information</option>
                  <option value="support" className="bg-card text-foreground">Technical Support</option>
                  <option value="sales" className="bg-card text-foreground">Sales</option>
                  <option value="other" className="bg-card text-foreground">Other</option>
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
                  className="w-full px-4 py-3 border-2 border-border rounded-xl bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm resize-none placeholder:text-muted"
                  placeholder="Enter your message or enquiry"
                />
              </div>


                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-primary text-white font-semibold rounded-full hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
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
      <div className="min-h-screen bg-background pt-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <ContactForm />
    </Suspense>
  );
}

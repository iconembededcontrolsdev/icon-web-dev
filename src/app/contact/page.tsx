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
  // State to track which field is focused/active for the animation
  const [focusedField, setFocusedField] = useState<'phone' | 'email' | null>(null);

  // Derive the width class based on focused state
  // If phone is focused: Phone wide, Email narrow
  // If email is focused: Email wide, Phone narrow
  // Default (null): Both equal or some default. 
  // Let's go with: Default 50/50. Focused: 70/30.
  // Actually, let's use flex-grow logic or percentage widths with transition.

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Logic: If user provides phone but no email, use company email
    let submissionData = { ...formData };

    // Check if phone or email is provided. At least one is usually required.
    if (!formData.phone && !formData.email) {
      setError('Please provide either a phone number or an email address.');
      setIsSubmitting(false);
      return;
    }

    if (formData.phone && !/^\d{7,15}$/.test(formData.phone)) {
      setError('Please enter a valid phone number (7-15 digits)');
      setIsSubmitting(false);
      return;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);

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
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
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
              <div className="relative h-24 w-64 md:w-80">
                <Image
                  unoptimized
                  src="/images/highres/7. Extras/logo.png"
                  alt="Icon Embeded Controls"
                  fill
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
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">
                Message Sent!
              </h3>
              <p className="text-muted">We&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Phone and Email with Dynamic Resize */}
              <div className="flex flex-col md:flex-row gap-4 h-auto">
                {/* Phone Container */}
                <div
                  className={`relative transition-all duration-500 ease-in-out flex flex-col ${
                    focusedField === "phone"
                      ? "md:flex-[3]"
                      : focusedField === "email"
                        ? "md:flex-[1]"
                        : "md:flex-[1]"
                  }`}
                >
                  {focusedField === "email" ? (
                    // Collapsed State (Button lookalike, aligned with input)
                    <div
                      className="w-full cursor-pointer group"
                      onClick={() => setFocusedField("phone")}
                    >
                      {/* Spacer to match label height */}
                      <div className="h-[28px] mb-2"></div>

                      {/* The Button */}
                      <div className="h-[54px] w-full bg-primary/5 group-hover:bg-primary/10 rounded-xl flex items-center justify-center border-2 border-transparent transition-colors">
                        <span className="font-bold text-primary text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis px-2">
                          Phone
                        </span>
                      </div>
                    </div>
                  ) : (
                    // Expanded State
                    <div className="w-full">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-primary mb-2 whitespace-nowrap overflow-hidden text-ellipsis h-[28px] leading-[28px]"
                      >
                        Phone Number
                      </label>
                      <div className="flex h-[54px] relative bg-card rounded-xl">
                        <div className="relative z-10">
                          <select
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                            onClick={(e) => e.stopPropagation()}
                            className="h-full appearance-none bg-card border-2 border-r-0 border-border rounded-l-xl px-3 focus:ring-0 focus:border-border cursor-pointer text-foreground w-[80px]"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234f8fff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 0.25rem center",
                              backgroundSize: "1rem 1rem",
                            }}
                          >
                            {countryCodes.map((country) => (
                              <option
                                key={country.code}
                                value={country.dial_code}
                              >
                                {country.dial_code}
                              </option>
                            ))}
                          </select>
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          onFocus={() => setFocusedField("phone")}
                          onClick={(e) => e.stopPropagation()}
                          className="h-full w-full px-4 border-2 border-border rounded-r-xl bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm placeholder:text-muted min-w-0"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Email Container */}
                <div
                  className={`relative transition-all duration-500 ease-in-out flex flex-col ${
                    focusedField === "email"
                      ? "md:flex-[3]"
                      : focusedField === "phone"
                        ? "md:flex-[1]"
                        : "md:flex-[1]"
                  }`}
                >
                  {focusedField === "phone" ? (
                    // Collapsed State (Button lookalike, aligned with input)
                    <div
                      className="w-full cursor-pointer group"
                      onClick={() => setFocusedField("email")}
                    >
                      {/* Spacer to match label height */}
                      <div className="h-[28px] mb-2"></div>

                      {/* The Button */}
                      <div className="h-[54px] w-full bg-primary/5 group-hover:bg-primary/10 rounded-xl flex items-center justify-center border-2 border-transparent transition-colors">
                        <span className="font-bold text-primary text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis px-2">
                          Email
                        </span>
                      </div>
                    </div>
                  ) : (
                    // Expanded State
                    <div className="w-full">
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-primary mb-2 whitespace-nowrap overflow-hidden text-ellipsis h-[28px] leading-[28px]"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-[54px] px-4 border-2 border-border rounded-xl bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm placeholder:text-muted min-w-0"
                        placeholder="Enter your email"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Row 2: Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-primary mb-2"
                >
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

              {/* Row 3: Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-primary mb-2"
                >
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
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "1.25rem 1.25rem",
                    paddingRight: "2.5rem",
                  }}
                >
                  <option value="" className="bg-card text-muted">
                    Select a category
                  </option>
                  <option value="general" className="bg-card text-foreground">
                    General Inquiry
                  </option>
                  <option value="product" className="bg-card text-foreground">
                    Product Information
                  </option>
                  <option value="support" className="bg-card text-foreground">
                    Technical Support
                  </option>
                  <option value="sales" className="bg-card text-foreground">
                    Sales
                  </option>
                  <option value="other" className="bg-card text-foreground">
                    Other
                  </option>
                </select>
              </div>

              {/* Row 4: Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-primary mb-2"
                >
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

              {error && (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-primary text-white font-semibold rounded-full hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
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

'use client';

import { useSearchParams } from 'next/navigation';
import { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import LogoFrame from '@/components/LogoFrame';
import { countryCodes } from '@/data/countryCodes';

function ProductEnquiryForm() {
  const searchParams = useSearchParams();
  const productName = searchParams.get("product");

  const [productImage, setProductImage] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<"phone" | "email" | null>(null);

  useEffect(() => {
    const fetchProductImage = async () => {
      if (!productName) return;

      try {
        const response = await fetch('/content/products.json');
        if (!response.ok) return;

        const data = await response.json();
        const products = data.products || [];
        const query = productName.trim().toLowerCase();

        const matchesText = (value?: string) =>
          Boolean(value && value.toLowerCase().includes(query));

        const matchesProduct = (product: any) => {
          if (
            matchesText(product.title) ||
            matchesText(product.subtitle) ||
            matchesText(product.description) ||
            matchesText(product.fullDescription)
          ) {
            return true;
          }

          return Array.isArray(product.models) && product.models.some((model: any) =>
            matchesText(model.model) ||
            matchesText(model.type) ||
            matchesText(model.description) ||
            matchesText(model.subtitle) ||
            matchesText(model.fullDescription)
          );
        };

        // Match by product metadata or nested model metadata so model-name URLs resolve too.
        const product = products.find(matchesProduct);

        if (product) {
          const matchingModel = Array.isArray(product.models)
            ? product.models.find((model: any) =>
                matchesText(model.model) ||
                matchesText(model.type) ||
                matchesText(model.description) ||
                matchesText(model.subtitle) ||
                matchesText(model.fullDescription)
              )
            : null;

          // Prefer the exact model image, then product image fallbacks.
          const image =
            matchingModel?.images?.[0] ||
            matchingModel?.image ||
            product.mainImage ||
            (product.images && product.images.length > 0 ? product.images[0] : null);

          if (image) {
            setProductImage(image);
          }
        }
      } catch (error) {
        // Silently fail
      }
    };

    fetchProductImage();
  }, [productName]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY || '';

  type RecaptchaWindow = Window & {
    grecaptcha?: {
      enterprise?: {
        ready: (callback: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

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
      // Ensure reCAPTCHA is configured and available
      if (!recaptchaSiteKey) {
        setError('reCAPTCHA is not configured. Please contact the administrator.');
        setIsSubmitting(false);
        return;
      }

      const win = window as RecaptchaWindow;
      if (!win.grecaptcha?.enterprise?.ready || !win.grecaptcha.enterprise.execute) {
        setError('reCAPTCHA script is not loaded yet. Please try again.');
        setIsSubmitting(false);
        return;
      }

      const token = await new Promise<string>((resolve, reject) => {
        win.grecaptcha?.enterprise?.ready(async () => {
          try {
            const responseToken = await win.grecaptcha!.enterprise!.execute(recaptchaSiteKey, {
              action: 'submit',
            });
            resolve(responseToken);
          } catch (error) {
            reject(error);
          }
        });
      });

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          category: "product",
          product: productName || "General Product Enquiry",
          recaptchaToken: token,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send enquiry");
      }

      setSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          countryCode: "+91",
          phone: "",
          message: "",
        });
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormData({
      ...formData,
      phone: value,
    });
  };

  return (
    <div className="min-h-screen bg-background pt-12">
      {recaptchaSiteKey && (
        <Script
          id="recaptcha-enterprise"
          src={`https://www.google.com/recaptcha/enterprise.js?render=${recaptchaSiteKey}`}
          strategy="afterInteractive"
        />
      )}
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/products"
          className="inline-flex items-center text-primary hover:text-accent transition-colors font-medium relative z-10"
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
          Back to Products
        </Link>
      </div>

      {/* Enquiry Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-card rounded-[40px] shadow-lg p-8 sm:p-12 lg:p-16">
          {/* Branding Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              Product Enquiry
            </h1>
            {productName && (
              <>
                <div className="flex items-center justify-center gap-4 md:gap-8 mb-8 h-32 md:h-48 w-full">
                  {productImage && (
                    <div className="relative flex-1 h-full min-w-0">
                      <LogoFrame
                        src={productImage}
                        alt={productName}
                        fill
                        wrapperClassName="w-full h-full"
                        paddingClassName="p-2"
                        imgClassName="object-contain object-center"
                        sizes="(max-width: 768px) 100vw, 48vw"
                      />
                    </div>
                  )}

                  {productImage && <div className="h-12 md:h-20 w-[1px] bg-border/50"></div>}

                  <div className={`relative h-full ${productImage ? 'flex-1 min-w-0' : 'w-48 flex-none'}`}>
                    <LogoFrame
                      src="/images/lowres/7.%20Extras/logo-low.png"
                      alt="Icon Embeded Controls"
                      fill
                      wrapperClassName={productImage ? 'w-full h-full' : 'w-48 h-full'}
                      paddingClassName="p-0"
                      imgClassName={`object-contain ${productImage ? 'object-left' : 'object-center'}`}
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">
                  {productName}
                </h2>
                <p className="text-base md:text-lg text-muted">
                  Get more information about this product
                </p>
              </>
            )}
            {!productName && (
              <p className="text-base md:text-lg text-muted">
                Get in touch with us about our products
              </p>
            )}
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
                Enquiry Submitted!
              </h3>
              <p className="text-muted">We&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Row 1: Phone and Email with Dynamic Resize */}
              <div className="flex flex-col md:flex-row gap-4 h-auto">

                {/* Phone Container */}
                <div
                  className={`relative transition-all duration-500 ease-in-out flex flex-col ${focusedField === 'phone' ? 'md:flex-[3]' : focusedField === 'email' ? 'md:flex-[1]' : 'md:flex-[1]'
                    }`}
                >
                  {focusedField === 'email' ? (
                    // Collapsed State (Button lookalike, aligned with input)
                    <div
                      className="w-full cursor-pointer group"
                      onClick={() => setFocusedField('phone')}
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
                      <label htmlFor="phone" className="block text-sm font-semibold text-primary mb-2 whitespace-nowrap overflow-hidden text-ellipsis h-[28px] leading-[28px]">
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
                              <option key={country.code} value={country.dial_code}>
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
                          onFocus={() => setFocusedField('phone')}
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
                  className={`relative transition-all duration-500 ease-in-out flex flex-col ${focusedField === 'email' ? 'md:flex-[3]' : focusedField === 'phone' ? 'md:flex-[1]' : 'md:flex-[1]'
                    }`}
                >
                  {focusedField === 'phone' ? (
                    // Collapsed State (Button lookalike, aligned with input)
                    <div
                      className="w-full cursor-pointer group"
                      onClick={() => setFocusedField('email')}
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
                      <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2 whitespace-nowrap overflow-hidden text-ellipsis h-[28px] leading-[28px]">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-[54px] px-4 border-2 border-border rounded-xl bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm placeholder:text-muted min-w-0"
                        placeholder="Enter your email"
                      />
                    </div>
                  )}
                </div>

              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm md:text-base font-semibold text-primary mb-2"
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

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm md:text-base font-semibold text-primary mb-2"
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-none text-primary bg-card"
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
                  className="w-full px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? "Sending..." : "Submit Enquiry"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductEnquiry() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background pt-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        </div>
      }
    >
      <ProductEnquiryForm />
    </Suspense>
  );
}

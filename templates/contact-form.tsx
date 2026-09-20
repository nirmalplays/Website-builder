import React, { useState } from 'react';
import { Mail, User, MessageSquare, Send, CheckCircle, Shield } from 'lucide-react';

export default function App() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {submitted ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Message Received!</h2>
            <p className="text-slate-600 mb-8 max-w-sm">
              Thank you for reaching out. Our support team typically responds within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <div className="p-8 sm:p-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Get in touch</h1>
              <p className="text-slate-500">Have a question or need assistance? Fill out the form below and we'll be in touch shortly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      required
                      type="text"
                      id="name"
                      placeholder="Jane Doe"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <p className="text-xs text-slate-400">Your full legal name as it appears on your account.</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      required
                      type="email"
                      id="email"
                      placeholder="jane@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <p className="text-xs text-slate-400">We'll never share your email with anyone else.</p>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-semibold text-slate-700">Subject</label>
                <input
                  required
                  type="text"
                  id="subject"
                  placeholder="How can we help you?"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700">Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <textarea
                    required
                    id="message"
                    rows={4}
                    placeholder="Describe your inquiry in detail..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <p className="text-xs text-slate-400">Max 500 characters. Please be as descriptive as possible.</p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400">
          <Shield className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wider font-medium">Secure Encrypted Form</span>
        </div>
      </div>
    </div>
  );
}
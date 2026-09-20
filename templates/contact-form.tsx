import React, { useState, useEffect } from 'react';
import { 
  Send, 
  CheckCircle, 
  XCircle, 
  User, 
  Mail, 
  MessageSquare, 
  Tag,
  Loader2
} from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('contactFormData');
      if (saved) setFormData(JSON.parse(saved));
    } catch (e) {
      console.error("Failed to load data", e);
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address.';
    if (formData.subject.length < 5) newErrors.subject = 'Subject must be at least 5 characters.';
    if (formData.message.length < 20) newErrors.message = 'Message must be at least 20 characters.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    try {
      localStorage.setItem('contactFormData', JSON.stringify(newData));
    } catch (e) {
      console.error("Failed to save data", e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      localStorage.removeItem('contactFormData');
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Send us a message</h1>
          <p className="text-slate-500 mt-2">We typically respond within 24 business hours.</p>
        </div>

        {isSuccess ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
            <CheckCircle className="w-12 h-12 text-emerald-500 mb-4" />
            <h2 className="text-lg font-semibold text-emerald-900">Message Sent Successfully!</h2>
            <p className="text-emerald-700 mt-2 text-sm">Thank you for reaching out. We will get back to you shortly.</p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="mt-6 text-emerald-700 font-medium hover:text-emerald-800 underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition ${errors.name ? 'border-red-300' : 'border-slate-300'}`}
                  placeholder="Jane Doe"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle className="w-3 h-3"/>{errors.name}</p>}
              <p className="text-slate-400 text-[11px] mt-1">Your legal full name.</p>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition ${errors.email ? 'border-red-300' : 'border-slate-300'}`}
                  placeholder="jane@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle className="w-3 h-3"/>{errors.email}</p>}
              <p className="text-slate-400 text-[11px] mt-1">We'll never share your email with anyone.</p>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
              <div className="relative">
                <Tag className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition ${errors.subject ? 'border-red-300' : 'border-slate-300'}`}
                  placeholder="How can we help?"
                />
              </div>
              {errors.subject && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle className="w-3 h-3"/>{errors.subject}</p>}
              <p className="text-slate-400 text-[11px] mt-1">A brief description of your inquiry.</p>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition ${errors.message ? 'border-red-300' : 'border-slate-300'}`}
                  placeholder="Describe your request in detail..."
                />
              </div>
              {errors.message && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle className="w-3 h-3"/>{errors.message}</p>}
              <p className="text-slate-400 text-[11px] mt-1">Minimum 20 characters required.</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
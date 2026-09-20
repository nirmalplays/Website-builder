import React, { useState } from 'react';
import { Check, Star, Zap, Shield, ArrowRight } from 'lucide-react';

export default function App() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      priceMonthly: 29,
      priceAnnual: 290,
      description: 'Perfect for solo developers and personal projects.',
      features: ['1 Project limit', 'Basic analytics', 'Community support', '1GB storage'],
      cta: 'Get Started',
      highlight: false,
    },
    {
      name: 'Professional',
      priceMonthly: 79,
      priceAnnual: 790,
      description: 'The sweet spot for growing teams and startups.',
      features: ['Unlimited projects', 'Advanced analytics', 'Priority email support', '50GB storage', 'Custom integrations'],
      cta: 'Start Free Trial',
      highlight: true,
    },
    {
      name: 'Enterprise',
      priceMonthly: 199,
      priceAnnual: 1990,
      description: 'Scalable infrastructure for large organizations.',
      features: ['Unlimited everything', 'Dedicated account manager', '24/7 Phone support', 'Unlimited storage', 'SSO & Security'],
      cta: 'Contact Sales',
      highlight: false,
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-blue-600 tracking-wide uppercase">Pricing Plans</h2>
          <p className="mt-2 text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Choose the right plan for you
          </p>
          
          {/* Toggle */}
          <div className="mt-8 flex justify-center items-center gap-4">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 bg-blue-600 rounded-full transition-colors duration-200 ease-in-out focus:outline-none"
            >
              <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${isAnnual ? 'translate-x-7' : ''}`} />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
              Yearly <span className="text-blue-600 text-xs bg-blue-50 px-2 py-0.5 rounded-full font-bold ml-1">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 items-center">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative p-8 bg-white rounded-2xl border ${plan.highlight ? 'border-blue-600 shadow-xl scale-105 z-10' : 'border-slate-200 shadow-sm'}`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 -translate-y-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <Star size={12} fill="white" /> Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="mt-2 text-slate-500 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-5xl font-extrabold text-slate-900">
                  ${isAnnual ? plan.priceAnnual / 12 : plan.priceMonthly}
                </span>
                <span className="text-slate-500 font-medium">/mo</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                    <Check size={18} className="text-blue-600 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${plan.highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                {plan.cta}
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-20 flex flex-col md:flex-row justify-center items-center gap-8 text-slate-500 border-t pt-12 border-slate-200">
            <div className="flex items-center gap-2">
                <Zap size={20} className="text-blue-600" />
                <span className="font-medium text-slate-700">Instant Activation</span>
            </div>
            <div className="flex items-center gap-2">
                <Shield size={20} className="text-blue-600" />
                <span className="font-medium text-slate-700">Secure Payment Processing</span>
            </div>
            <p className="text-sm">Cancel anytime. No hidden fees.</p>
        </div>
      </div>
    </div>
  );
}
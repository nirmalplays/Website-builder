import React, { useState } from 'react';
import { Check, Sparkles, Zap, Shield } from 'lucide-react';

export default function App() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 29,
      annualPrice: 240,
      description: 'Perfect for solo developers and hobbyists.',
      features: ['1 Project limit', 'Basic analytics', 'Community support', '1GB Storage'],
      icon: <Zap className="w-6 h-6 text-indigo-500" />,
      cta: 'Get Started'
    },
    {
      name: 'Professional',
      monthlyPrice: 79,
      annualPrice: 660,
      description: 'The best choice for growing teams and startups.',
      features: ['Unlimited projects', 'Advanced analytics', 'Priority email support', '50GB Storage', 'Custom domains'],
      icon: <Sparkles className="w-6 h-6 text-white" />,
      cta: 'Start Free Trial',
      highlighted: true
    },
    {
      name: 'Enterprise',
      monthlyPrice: 199,
      annualPrice: 1800,
      description: 'Advanced features for large-scale operations.',
      features: ['Everything in Pro', 'SSO & Security', 'Dedicated account manager', 'Unlimited Storage', 'API access'],
      icon: <Shield className="w-6 h-6 text-indigo-500" />,
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Pricing</h2>
          <p className="mt-2 text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Choose the perfect plan
          </p>
          
          <div className="mt-8 flex justify-center items-center">
            <span className={`mr-3 text-sm font-medium ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-indigo-600"
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAnnual ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
            <span className={`ml-3 text-sm font-medium ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
              Annual <span className="text-indigo-600 font-bold text-xs ml-1">(Save 30%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl border ${
                plan.highlighted 
                  ? 'bg-slate-900 border-slate-900 ring-2 ring-indigo-500 ring-offset-2' 
                  : 'bg-white border-slate-200'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-2">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold bg-indigo-500 text-white shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">{plan.icon}</div>
              <h3 className={`text-xl font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
              <p className={`mt-2 text-sm ${plan.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>{plan.description}</p>
              
              <div className="mt-6 flex items-baseline">
                <span className={`text-5xl font-extrabold tracking-tight ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                  ${isAnnual ? Math.round(plan.annualPrice / 12) : plan.monthlyPrice}
                </span>
                <span className={`ml-1 text-sm font-medium ${plan.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>/mo</span>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className={`w-5 h-5 ${plan.highlighted ? 'text-indigo-400' : 'text-indigo-600'}`} />
                    <span className={`ml-3 text-sm ${plan.highlighted ? 'text-slate-300' : 'text-slate-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`mt-8 w-full py-3 px-4 rounded-lg font-semibold text-sm transition-colors ${
                plan.highlighted 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
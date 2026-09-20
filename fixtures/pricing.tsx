import React, { useState } from 'react';
import { Check } from 'lucide-react';

export default function App() {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingTiers = [
    {
      name: 'Basic',
      monthlyPrice: 19,
      annualPrice: 199,
      description: 'Perfect for individuals and small teams getting started.',
      features: [
        '5 projects',
        'Unlimited clients',
        'Basic reporting',
        'Email support',
        '5 GB storage',
      ],
      buttonText: 'Get Started',
      isHighlighted: false,
    },
    {
      name: 'Pro',
      monthlyPrice: 49,
      annualPrice: 499,
      description: 'Everything you need to grow your business.',
      features: [
        'Unlimited projects',
        'Advanced analytics',
        'Priority support',
        'Custom branding',
        '50 GB storage',
        'Team collaboration',
      ],
      buttonText: 'Start Free Trial',
      isHighlighted: true,
    },
    {
      name: 'Enterprise',
      monthlyPrice: 99,
      annualPrice: 999,
      description: 'Scalable solutions for large organizations.',
      features: [
        'Unlimited projects & clients',
        'Dedicated account manager',
        'SLA & uptime guarantee',
        'Advanced security',
        'Unlimited storage',
        'Single Sign-On (SSO)',
      ],
      buttonText: 'Contact Sales',
      isHighlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Choose the plan that's right for your business.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full bg-gray-200 p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`py-2 px-6 rounded-full text-sm font-medium transition-colors duration-200 ${
                !isAnnual
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-300'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`py-2 px-6 rounded-full text-sm font-medium transition-colors duration-200 ${
                isAnnual
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-300'
              }`}
            >
              Annually{' '}
              <span className="ml-2 text-blue-100 hidden sm:inline-block">-20%</span>
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-xl shadow-lg border ${
                tier.isHighlighted
                  ? 'border-blue-500 bg-white scale-105 transition-transform duration-300'
                  : 'border-gray-200 bg-white'
              } p-8`}
            >
              <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
              <p className="mt-4 text-sm text-gray-600">{tier.description}</p>
              <p className="mt-6 flex items-baseline">
                <span className="text-5xl font-extrabold text-gray-900">
                  ${isAnnual ? tier.annualPrice : tier.monthlyPrice}
                </span>
                <span className="ml-1 text-xl font-semibold text-gray-600">
                  /{isAnnual ? 'year' : 'month'}
                </span>
              </p>
              <ul role="list" className="mt-6 space-y-4 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 flex-shrink-0" aria-hidden="true" />
                    <span className="ml-3 text-base text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <button
                  className={`block w-full py-3 px-6 border border-transparent rounded-md text-center text-base font-medium transition-colors duration-200 ${
                    tier.isHighlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  {tier.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
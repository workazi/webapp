import React, { useState } from 'react';

// Dummy data for the packages
const packages = [
  {
    id: 'starter',
    name: 'Starter Plan',
    price: '0',
    unit: 'First Month',
    description: 'Perfect for getting started and exploring the platform risk-free.',
    features: ['5 Job postings', 'Basic applicant screening', 'Email support'],
  },
  {
    id: 'pay-as-you-go',
    name: 'Pay As You Go',
    price: '20',
    unit: 'Job',
    description: 'Best for occasional hiring. Only pay for what you actually need.',
    features: ['Pay per active listing', 'Advanced reliability matching', '24/7 Support'],
  },
  {
    id: 'unlimited',
    name: 'Enterprise Pro',
    price: '150',
    unit: 'Month',
    description: 'For growing teams with continuous hiring and supplier needs.',
    features: ['Unlimited job postings', 'Priority marketplace visibility', 'Dedicated account manager'],
  },
];

export default function PackageSelection() {
  const [selectedPackage, setSelectedPackage] = useState('pay-as-you-go');

  return (
    <div className='max-w-6xl mx-auto p-4 grid gap-8'>
      {/* Header Section */}
      <div className='grid gap-2 max-w-2xl'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Package selection</h1>
        <p className='text-gray-500 leading-relaxed'>
          Please choose the package you will be subscribing to monthly. For the first month it will be free, 
          and we will always remind you before any renewal. More details about payment will be shared with you.
        </p>
      </div>

      {/* Packages Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-start'>
        {packages.map((pkg) => {
          const isSelected = selectedPackage === pkg.id;
          
          return (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg.id)}
              className={`flex flex-col h-full justify-between border p-6 rounded-xl shadow-sm transition-all duration-200 cursor-pointer hover:shadow-md ${
                isSelected 
                  ? 'border-green-500 ring-2 ring-green-500/20 bg-green-50/10' 
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className='grid gap-4'>
                {/* Package Name & Tag */}
                <div className='flex justify-between items-center'>
                  <h3 className='text-xl font-bold text-gray-800'>{pkg.name}</h3>
                  {isSelected && (
                    <span className='bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-semibold'>
                      Selected
                    </span>
                  )}
                </div>

                {/* Pricing */}
                <div className='flex items-baseline text-gray-900'>
                  <span className='text-5xl font-extrabold tracking-tight'>
                    {pkg.price === '0' ? 'Free' : `${pkg.price} KES`}
                  </span>
                  {pkg.price !== '0' && (
                    <span className='text-gray-500 ml-1 text-xl font-semibold'>
                      /{pkg.unit}
                    </span>
                  )}
                </div>

                <p className='text-sm text-gray-500'>{pkg.description}</p>
                <hr className='border-gray-100' />

                {/* Features List */}
                <ul className='space-y-2.5 text-sm text-gray-600 mb-6'>
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className='flex items-center gap-2'>
                      <svg className='w-4 h-4 text-green-500 shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-2.5 px-4 font-medium rounded-lg transition-colors duration-150 ${
                  isSelected
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-250'
                }`}
              >
                {isSelected ? 'Selected' : 'Choose Plan'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
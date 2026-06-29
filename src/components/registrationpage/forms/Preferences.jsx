import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// 1. Question Configuration System
// This lets you easily add, change, or rearrange questions and selection types.
const PREFERENCE_QUESTIONS = [
  {
    id: 'notificationMethods',
    type: 'multiple', // Allows checking multiple options
    question: 'When a new job matches your skills, how would you like to be notified?',
    options: [
      { label: 'WhatsApp Message', value: 'whatsapp' },
      { label: 'SMS Notification', value: 'sms' },
      { label: 'Email Alert', value: 'email' },
      { label: 'In-app Notification', value: 'in_app' }
    ]
  },
  {
    id: 'automaticApply',
    type: 'single', // Force exactly one choice
    question: 'Would you like us to apply automatically a job that matches your skills?',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
  
    ]
  },
];

export default function Preferences() {
  // 2. Generate initial values dynamically based on the question types
  const initialValues = PREFERENCE_QUESTIONS.reduce((acc, q) => {
    acc[q.id] = q.type === 'multiple' ? [] : ''; // Arrays for checkboxes, strings for radios
    return acc;
  }, {});

  const handleSubmit = (values) => {
    console.log('User Preferences Submitted:', values);
    // If you pass down a handleNext prop from your stepper page, call it here:
    // props.onNext()
  };

  return (
    <div className='grid gap-8'>
      {/* Header Section */}
      <div className='grid gap-2'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>We are almost there 🎉</h1>
        <p className='text-gray-500 leading-relaxed'>
          Please configure your system preferences. This controls how we reach out to you when matching 
          contracts, job listings, or status updates occur.
        </p>
      </div>

      {/* Formik Integration */}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className='grid gap-8'>
            {PREFERENCE_QUESTIONS.map((q) => (
              <div key={q.id} className='grid gap-4'>
                <label className='font-semibold text-gray-800 text-base block leading-snug'>
                  {q.question}
                </label>

                <div className='grid gap-3'>
                  {q.options.map((option) => {
                    // Decide formik input attributes on the fly
                    const isMultiple = q.type === 'multiple';
                    const inputType = isMultiple ? 'checkbox' : 'radio';
                    
                    // Simple styling checker to highlight checked components
                    const isChecked = isMultiple 
                      ? values[q.id]?.includes(option.value)
                      : values[q.id] === option.value;

                    return (
                      <label
                        key={option.value}
                        className={`flex items-center gap-3 p-3.5 rounded-lg cursor-pointer select-none transition-all ${
                          isChecked
                            ? 'border-green-500 ring-1 ring-green-500/20'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <Field
                          type={inputType}
                          name={q.id}
                          value={option.value}
                          className='w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded'
                        />
                        <span className='text-sm font-medium text-gray-700'>
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Note: In your stepper architecture, your primary 'Next' button sits on the parent layer. 
                If you ever want a standalone submission fallback right inside this form, you can place it here. */}
          </Form>
        )}
      </Formik>
    </div>
  );
}
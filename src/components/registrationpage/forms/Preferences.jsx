import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const PREFERENCE_QUESTIONS = [
  {
    id: 'notificationMethods',
    type: 'multiple', 
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
    type: 'single',
    question: 'Would you like us to apply automatically a job that matches your skills?',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
  
    ]
  },
];

export default function Preferences() {
  
  const initialValues = PREFERENCE_QUESTIONS.reduce((acc, q) => {
    acc[q.id] = q.type === 'multiple' ? [] : ''; // Arrays for checkboxes, strings for radios
    return acc;
  }, {});

  const handleSubmit = (values) => {
    console.log('User Preferences Submitted:', values);

  };

  return (
    <div className='grid gap-8'>
      
      <div className='grid gap-2'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>We are almost there 🎉</h1>
        <p className='text-gray-500 leading-relaxed'>
          Please configure your system preferences. This controls how we reach out to you when matching 
          contracts, job listings, or status updates occur.
        </p>
      </div>

      
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
                    
                    const isMultiple = q.type === 'multiple';
                    const inputType = isMultiple ? 'checkbox' : 'radio';
                    
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
          </Form>
        )}
      </Formik>
    </div>
  );
}
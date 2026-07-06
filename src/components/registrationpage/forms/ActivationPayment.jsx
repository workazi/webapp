import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextInput from '../../inputs/TextInput'

const validationSchema = Yup.object().shape({
  phone_number: Yup.string()
    .required('Phone number is required')
    .matches(/^(?:254|\+254|0)?(7|1)\d{8}$/, 'Enter a valid Kenyan phone number'),
  payment_method: Yup.string().required('Please select a payment method'),
})

export default function ActivationPayment({handleNextFunc}) {
  const initialValues = {
    phone_number: '',
    payment_method: 'safaricom',
  }

  const handleInitiatePayment = (values) => {
    console.log('Initiating STK Push with:', values)
  }

  const handleVerifyPayment = (values) => {
    handleNextFunc()
    console.log('Checking payment status for:', values.phone_number)
  }

  return (
    <div className='p-8'> 
        <div>
            <h1 className='font-bold text-3xl py-2 text-gray-800'>Initiate payment</h1>
            <p className='text-gray-500 py-1'>One off fee of KES 35 for account activation</p>
        </div>

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleInitiatePayment}
        >
            {({ values, errors, touched }) => (
                <Form className='mt-4 space-y-4'>
                    <div>
                        <TextInput 
                            name='phone_number' 
                            placeholder='e.g., 0712345678' 
                        />
                        {errors.phone_number && touched.phone_number && (
                            <div className="text-red-500 text-sm mt-1">{errors.phone_number}</div>
                        )}
                    </div>

                    {/* Payment Method Radio Buttons */}
                    <div>
                        <label className='block text-gray-700 font-medium mb-1'>Select Payment Method:</label>
                        <div className='flex justify-between gap-4 py-2'>
                            <label className={`flex flex-1 gap-2 font-bold p-3 rounded-lg items-center cursor-pointer transition-colors ${values.payment_method === 'safaricom' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'}`}>
                                <Field name='payment_method' value='safaricom' type='radio' className='w-4 h-4 accent-green-600' />
                                Safaricom
                            </label>
                            
                            <label className={`flex flex-1 gap-2 font-bold p-3 rounded-lg items-center cursor-pointer transition-colors ${values.payment_method === 'airtel' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-500'}`}>
                                <Field name='payment_method' value='airtel' type='radio' className='w-4 h-4 accent-red-600' />
                                Airtel Money
                            </label>
                        </div>
                        <ErrorMessage name="payment_method" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* Action Buttons */}
                    <div className='flex flex-col gap-3 pt-2'>
                        <button 
                            type='submit' 
                            className='w-full bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-lg transition-colors'
                        >
                            Initiate Payment
                        </button>

                        <button 
                            type='button'
                            onClick={() => handleVerifyPayment(values)}
                            className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold p-3 rounded-lg transition-colors'
                        >
                            I have paid, verify payment
                        </button>
                    </div>

                    {values.payment_method === 'safaricom' && (
                        <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
                            <h3 className='font-bold text-gray-800 text-lg mb-2'>Manual M-PESA Instructions</h3>
                            <p className='text-sm text-gray-600 mb-3'>If you did not receive an automatic STK prompt on your phone, follow these steps:</p>
                            <ol className='list-decimal list-inside text-sm text-gray-700 space-y-1.5'>
                                <li>Go to your M-PESA menu.</li>
                                <li>Select <span className='font-semibold'>Lipa na M-PESA</span>, then <span className='font-semibold'>Paybill</span>.</li>
                                <li>Enter Business No: <span className='font-bold text-green-600'>XXXXXX</span>.</li>
                                <li>Enter Account No: <span className='font-bold text-green-600'>ACTIVATE</span> (or your phone number).</li>
                                <li>Enter Amount: <span className='font-semibold'>KES 35</span>.</li>
                                <li>Enter your M-PESA PIN and press Send.</li>
                                <li>Click the <span className='font-semibold'>Verify Payment</span> button above.</li>
                            </ol>
                        </div>
                    )}

                    {values.payment_method === 'airtel' && (
                        <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
                            <h3 className='font-bold text-gray-800 text-lg mb-2'>Manual Airtel Money Instructions</h3>
                            <p className='text-sm text-gray-600 mb-3'>If you did not receive an automatic push notification, follow these steps:</p>
                            <ol className='list-decimal list-inside text-sm text-gray-700 space-y-1.5'>
                                <li>Dial <span className='font-semibold'>*334#</span> on your Airtel line.</li>
                                <li>Select <span className='font-semibold'>Airtel Money</span>.</li>
                                <li>Choose <span className='font-semibold'>Lipa na Airtel Money</span>, then <span className='font-semibold'>Paybill</span>.</li>
                                <li>Enter Business Name/No: <span className='font-bold text-red-600'>YYYYYY</span>.</li>
                                <li>Enter Amount: <span className='font-semibold'>KES 35</span>.</li>
                                <li>Enter Account Name/No: <span className='font-bold text-red-600'>ACTIVATE</span>.</li>
                                <li>Enter your Airtel Money PIN and confirm.</li>
                                <li>Click the <span className='font-semibold'>Verify Payment</span> button above.</li>
                            </ol>
                        </div>
                    )}
                </Form>
            )}
        </Formik>
    </div>
  )
}
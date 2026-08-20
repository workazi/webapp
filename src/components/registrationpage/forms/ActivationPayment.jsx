import { useState, useRef, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextInput from '../../inputs/TextInput'
import { oneOffPayment, verifyPayment } from '../../../api/auth'

const validationSchema = Yup.object().shape({
  phone_number: Yup.string()
    .required('Phone number is required')
    .matches(/^(?:254|\+254|0)?(7|1)\d{8}$/, 'Enter a valid Kenyan phone number'),
  payment_method: Yup.string().required('Please select a payment method'),
})

const POLL_INTERVAL_MS = 10000

const getSavedBillingInfo = () => {
  try {
    const savedSession = sessionStorage.getItem('_wz_b_session');
    if (savedSession) {
      return JSON.parse(atob(savedSession));
    }
  } catch (e) {
    console.error("Error reading session memory: ", e);
  }
  return null;
}

// simple obfuscation to match existing billing session convention, not real encryption
const saveEncryptedSession = (key, data) => {
  sessionStorage.setItem(key, btoa(JSON.stringify(data)));
}

export default function ActivationPayment({ handleNextFunc }) {
  const [paymentStatus, setPaymentStatus] = useState({ type: '', message: '' });
  const billingInfo = getSavedBillingInfo();
  const pollTimerRef = useRef(null);

  const amount = billingInfo.amount

  useEffect(() => {
    return () => clearTimeout(pollTimerRef.current);
  }, []);

  const stopPolling = () => {
    clearTimeout(pollTimerRef.current);
    pollTimerRef.current = null;
  }

  const handlePaymentSuccess = (paymentRecord) => {
    stopPolling();
    saveEncryptedSession('_wz_lg_session', paymentRecord.user);
    sessionStorage.removeItem('_wz_b_session');
    setPaymentStatus({ type: 'success', message: 'Payment confirmed! Redirecting...' });
    handleNextFunc();
  }

  const pollPaymentStatus = (transactionId) => {
    pollTimerRef.current = setTimeout(async () => {
      const response = await verifyPayment(transactionId);

      if (response.success && response.data?.status === 'SUCCESS') {
        handlePaymentSuccess(response.data);
        return;
      }

      if (response.success && response.data?.status === 'PENDING') {
        setPaymentStatus({ type: 'pending', message: 'Payment still pending, checking again shortly...' });
        pollPaymentStatus(transactionId);
        return;
      }

      setPaymentStatus({
        type: 'error',
        message: response.data?.detail || 'Could not confirm payment status. Please try verifying manually.'
      });
    }, POLL_INTERVAL_MS);
  }

  const initialValues = {
    phone_number: '',
    payment_method: 'safaricom',
  }

  const handleInitiatePayment = async (values, { setSubmitting }) => {
    setSubmitting(true);
    setPaymentStatus({ type: '', message: '' });

    if (!billingInfo?.userId) {
      setPaymentStatus({ 
        type: 'error', 
        message: 'Please reload or sign up again.' 
      });
      setSubmitting(false);
      return;
    }

    const payload = {
      user_id: billingInfo.userId,
      phone_number: values.phone_number,
      payment_method: values.payment_method,
      amount: amount
    };

    const response = await oneOffPayment(payload);

    if (response.success) {
      const transactionId = response.data?.transaction_id || '';
      
      if (billingInfo) {
        const updatedSession = { ...billingInfo, transactionId };
        sessionStorage.setItem('_wz_b_session', btoa(JSON.stringify(updatedSession)));
      }

      setPaymentStatus({ 
        type: 'success', 
        message: `${response.data?.detail || 'Payment initiated successfully!'}. Check your phone for the push prompt.` 
      });

      if (transactionId) {
        pollPaymentStatus(transactionId);
      }
    } else {
      const serverDetail = response.data?.detail || '';
      let errorDisplay = 'Could not initiate connection. Please try again.';

      if (serverDetail.includes('Unsupported payment provider')) {
        errorDisplay = 'Payment method selected is currently unsupported by our provider.';
      } else if (serverDetail.includes('required')) {
        errorDisplay = 'Please verify payment method fields are filled.';
      } else if (serverDetail) {
        errorDisplay = serverDetail;
      }

      setPaymentStatus({ type: 'error', message: errorDisplay });
    }
    setSubmitting(false);
  }

  const handleVerifyPayment = async () => {
    const currentBillingInfo = getSavedBillingInfo();
    const transactionId = currentBillingInfo?.transactionId;

    if (!transactionId) {
      setPaymentStatus({ type: 'error', message: 'No payment found to verify. Please initiate payment first.' });
      return;
    }

    stopPolling();
    setPaymentStatus({ type: 'pending', message: 'Checking payment status...' });

    const response = await verifyPayment(transactionId);

    if (response.success && response.data?.status === 'SUCCESS') {
      handlePaymentSuccess(response.data);
    } else if (response.success && response.data?.status === 'PENDING') {
      setPaymentStatus({ type: 'pending', message: 'Payment still pending, checking again shortly...' });
      pollPaymentStatus(transactionId);
    } else {
      setPaymentStatus({
        type: 'error',
        message: response.data?.detail || 'Could not confirm payment status. Please try again.'
      });
    }
  }

  return (
    <div className='p-8'> 
        <div>
            <h1 className='font-bold text-3xl py-2 text-gray-800'>Initiate payment</h1>
            <p className='text-gray-500 py-1'>One off fee of KES {amount} for account activation</p>
        </div>

        {paymentStatus.message && (
          <div className={`my-4 p-3 rounded-lg text-sm font-medium ${
            paymentStatus.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : paymentStatus.type === 'pending'
              ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {paymentStatus.message}
          </div>
        )}

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleInitiatePayment}
        >
            {({ values, isSubmitting }) => (
                <Form className='mt-4 space-y-4'>
                    <div>
                        <TextInput 
                            name='phone_number' 
                            placeholder='e.g., 0712345678' 
                        />
                    </div>

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

                    <div className='flex flex-col gap-3 pt-2'>
                        <button 
                            type='submit' 
                            disabled={isSubmitting}
                            className='w-full bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-lg transition-colors disabled:opacity-50'
                        >
                            {isSubmitting ? 'Initiating request...' : 'Initiate Payment'}
                        </button>

                        <button 
                            type='button'
                            onClick={handleVerifyPayment}
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
                                <li>Enter Business No: <span className='font-bold text-green-600'>{billingInfo?.paybill || 'XXXXXX'}</span>.</li>
                                <li>Enter Account No: <span className='font-bold text-green-600'>{billingInfo?.accountNumber || 'ACTIVATE'}</span>.</li>
                                <li>Enter Amount: <span className='font-semibold'>KES {amount}</span>.</li>
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
                                <li>Enter Business Name/No: <span className='font-bold text-red-600'>{billingInfo?.paybill || 'YYYYYY'}</span>.</li>
                                <li>Enter Amount: <span className='font-semibold'>KES {amount}</span>.</li>
                                <li>Enter Account Name/No: <span className='font-bold text-red-600'>{billingInfo?.accountNumber || 'ACTIVATE'}</span>.</li>
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
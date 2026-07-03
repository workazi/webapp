import React from 'react'
import { Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import TextInput from '../../inputs/TextInput'

export default function PersonalInfo({handleNextFunc}) {
  

  const validationSchema = Yup.object({
    fullname: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('Full name is required'),
    phone_number: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be at least 10 digits')
      .required('Phone number is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
    privacy_agreement: Yup.boolean()
      .oneOf([true], 'You must accept the privacy agreement to continue')
  })

  // 2. Handle form submission
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form Data:', values)
    
    // Simulate API Call
    setTimeout(() => {
      alert('Registration successful!')
      handleNextFunc()
      setSubmitting(false)
      resetForm()
    }, 1000)
  }

  return (
    <Formik
      initialValues={{
        fullname: '',
        phone_number: '',
        email: '',
        password: '',
        confirm_password: '',
        privacy_agreement: false,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <div>
            <div className='grid gap-2 max-w-2xl pt-4'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Hello 👋 </h1>
              <p className='text-gray-500 leading-relaxed'>
                Please keep your login credentials safe, as you will need them to access your account. For your security, remember to change your password the first time you log in.
              </p>
            </div>
            <Form className="form-container">
              <TextInput name="fullname" type="text" placeholder="Full name" label="Full Name" />
              <div className='grid grid-cols-2 gap-8 py-2'>
                  <TextInput name="phone_number" type="tel" placeholder="Phone Number" label="Phone Number" />
                  <TextInput name="email" type="email" placeholder="Email Address" label="Email" />
              </div>
              
              
              <TextInput name="password" type="password" placeholder="Password" label="Password" />
              <TextInput name="confirm_password" type="password" placeholder="Re-enter password" label="Confirm Password" />
              <div style={{ margin: '15px 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Field type="checkbox" name="privacy_agreement" />
                  <span>I accept the privacy <a href='https://workazi.ke/privacy-policy-2' className='text-blue-500 hover:text-blue-500/80' target='_blank'>agreement</a></span>
                </label>
                {errors.privacy_agreement && touched.privacy_agreement && (
                  <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>
                    {errors.privacy_agreement}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={isSubmitting} className='bg-green-500 hover:bg-green-500/90 w-full text-white rounded-lg p-2'>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>

            </Form>
        </div>

      )}
    </Formik>
  )
}
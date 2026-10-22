import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PersonalInfo from '../components/registrationpage/forms/PersonalInfo'
import ActivationPayment from '../components/registrationpage/forms/ActivationPayment'
import ProfileUpdate from '../components/registrationpage/forms/ProfileUpdate'
import EducationDetails from '../components/registrationpage/forms/EducationDetails'
import EmployeeSkills from '../components/registrationpage/forms/EmployeeSkills'
import PackageSelection from '../components/registrationpage/forms/PackageSelection'
import Preferences from '../components/registrationpage/forms/Preferences'
import { useAuth } from '../context/AuthContext'

const STEPS = [
  { id: 1, title: 'Personal Info', component: PersonalInfo },
  { id: 2, title: 'Account activation', component: ActivationPayment },
  { id: 3, title: 'Profile Layout', component: ProfileUpdate },
  { id: 4, title: 'Education', component: EducationDetails },
  { id: 5, title: 'Skills', component: EmployeeSkills },
  { id: 6, title: 'Package', component: PackageSelection },
  { id: 7, title: 'Preferences', component: Preferences },   
 
]

const STEP_STORAGE_KEY = '_wz_reg_step'

const getSavedStep = () => {
  try {
    const saved = sessionStorage.getItem(STEP_STORAGE_KEY)
    if (saved !== null) {
      const parsed = Number(saved)
      if (Number.isInteger(parsed) && parsed >= 0 && parsed < STEPS.length) {
        return parsed
      }
    }
  } catch (e) {
    console.error('Error reading registration step: ', e)
  }
  return 0
}

const formatNotificationChannel = (notify, method) => {
  if (notify === false || method === 'none' || !method) {
    return 'No notifications'
  }
  if (method.toLowerCase() === 'sms') {
    return 'SMS'
  }
  if (method.toLowerCase() === 'email') {
    return 'Email'
  }
  return method
}

export default function Registration() {
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(() => getSavedStep())
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false)

  useEffect(() => {
    try {
      if (!isRegistrationComplete) {
        sessionStorage.setItem(STEP_STORAGE_KEY, String(currentStep))
      }
    } catch (e) {
      console.error('Error saving registration step: ', e)
    }
  }, [currentStep, isRegistrationComplete])

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      sessionStorage.removeItem(STEP_STORAGE_KEY)
      setIsRegistrationComplete(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const ActiveComponent = STEPS[currentStep].component
  const userName = user?.fullname || user?.user_details?.fullname || 'Member'
  const accountNumber = user?.account_number || user?.paybill_account_number || 'N/A'
  const paybillNumber = user?.paybill
  const isAutoApply = Boolean(user?.auto_apply)
  const preferredChannel = formatNotificationChannel(user?.notify, user?.notification_method)

  return (
    <div className='bg-linear-to-r from-green-50 via-lime-50 to-white min-h-screen flex flex-col'>
      
      <nav className='px-8 py-2 backdrop-blur-sm border-b border-gray-100 shrink-0'>
        <p className='font-bold text-2xl tracking-tight text-gray-800'>
          work<span className='text-green-500'>azi</span>
        </p>
      </nav>

     
      <div className='w-full max-w-5xl mx-auto px-4 pt-8 pb-4 hidden md:block'>
        <div className='relative flex items-center justify-between w-full'>
          <div className='absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-200 -z-10' />
          
         
          <div 
            className='absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-green-500 transition-all duration-500 ease-in-out -z-10' 
            style={{ width: `${isRegistrationComplete ? 100 : (currentStep / (STEPS.length - 1)) * 100}%` }}
          />

            {STEPS.map((step, idx) => {
            const isCompleted = isRegistrationComplete || idx < currentStep
            const isActive = !isRegistrationComplete && idx === currentStep

            return (
              <div key={step.id} className='flex flex-col items-center flex-1 relative'>
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-green-500 text-white shadow-md' 
                      : isActive 
                      ? 'bg-white border-2 border-green-500 text-green-600 ring-4 ring-green-100 scale-110' 
                      : 'bg-white border-2 border-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M5 13l4 4L19 7' />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>

                <span 
                  className={`absolute top-12 text-center text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
                    isActive ? 'text-green-600 font-bold' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {!isRegistrationComplete && (
        <div className='md:hidden text-center pt-6 text-sm font-semibold text-gray-500'>
          Step <span className='text-green-600'>{currentStep + 1}</span> of {STEPS.length}: {STEPS[currentStep].title}
        </div>
      )}

      <div className='flex-1 flex items-start justify-center p-6 mt-6 md:mt-12'>
        <div className='bg-white p-8 w-full max-w-2xl shadow-xl rounded-2xl border border-gray-100 flex flex-col justify-between min-h-112.5'>        
          <div className='sm:h-140 overflow-auto'>
            {isRegistrationComplete ? (
              <div className='p-4 space-y-6'>
                {/* Success Header */}
                <div className='text-center space-y-2'>
                  <div className='mx-auto w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center shadow-sm'>
                    <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M5 13l4 4L19 7' />
                    </svg>
                  </div>
                  <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>
                    Welcome, {userName}!
                  </h1>
                  <p className='text-sm text-gray-500'>
                    Your account has been created and configured successfully.
                  </p>
                </div>

                {/* Paybill Account Number Card */}
                <div className='rounded-xl border border-green-200 bg-green-50/60 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-wider text-green-700'>
                      Paybill Account Number
                    </p>
                    <p className='text-xs text-gray-600 mt-0.5'>
                      Keep this account number from your activation for future reference and payments
                      {paybillNumber ? ` (Paybill: ${paybillNumber})` : ''}.
                    </p>
                  </div>
                  <span className='px-4 py-2 rounded-lg bg-white border border-green-300 font-mono text-lg font-extrabold text-green-700 tracking-wider shrink-0'>
                    {accountNumber}
                  </span>
                </div>

                {/* User Preferences Summary */}
                <div className='rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-3'>
                  <h2 className='text-sm font-bold uppercase tracking-wider text-gray-700'>
                    Your Notification & Application Preferences
                  </h2>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    <div className='rounded-lg bg-white border border-gray-200 p-3'>
                      <span className='text-xs text-gray-500 block'>Preferred Notification Channel</span>
                      <span className='text-sm font-bold text-gray-900 mt-0.5 block'>
                        {preferredChannel}
                      </span>
                    </div>
                    <div className='rounded-lg bg-white border border-gray-200 p-3'>
                      <span className='text-xs text-gray-500 block'>Job Application Mode</span>
                      <span className='text-sm font-bold text-green-700 mt-0.5 block'>
                        {isAutoApply ? 'Automatic (Auto-Apply)' : 'Manual via USSD'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* How Job Matching Works Based on Preference */}
                <div className='rounded-xl border border-gray-200 bg-white p-5 space-y-3'>
                  <h2 className='text-base font-bold text-gray-900'>
                    How Job Applications Will Work For You
                  </h2>

                  {isAutoApply ? (
                    <div className='space-y-2 text-sm text-gray-600 leading-relaxed'>
                      <p>
                        Since you enabled <span className='font-semibold text-gray-900'>Auto-Apply</span>, your job applications will be handled <span className='font-semibold text-green-700'>automatically</span> whenever a job matches your skills and profile.
                      </p>
                      <p>
                        You will be notified via <span className='font-semibold text-gray-900'>{preferredChannel}</span> and only need to wait for the employer. You will receive a notification once you are accepted for the role.
                      </p>
                    </div>
                  ) : (
                    <div className='space-y-3 text-sm text-gray-600'>
                      <p>
                        Since automatic application is turned off, here is how you will apply for matching jobs:
                      </p>
                      <ol className='list-decimal list-inside space-y-2 text-gray-700'>
                        <li>
                          You will be notified through your preferred channel (<span className='font-semibold text-gray-900'>{preferredChannel}</span>) with the matching job and its <span className='font-semibold'>Job Code</span>.
                        </li>
                        <li>
                          Dial <span className='font-mono font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded'>USSD xxxx</span> on your phone.
                        </li>
                        <li>
                          Follow the on-screen steps until prompted to <span className='font-semibold'>Enter Job Code</span>.
                        </li>
                        <li>
                          Enter the job code and <span className='font-semibold'>Submit</span>.
                        </li>
                        <li>
                          <span className='font-semibold'>Wait for the employer</span> — you will be notified once you are accepted for the role.
                        </li>
                      </ol>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className='pt-2'>
                  <Link
                    to='/'
                    className='block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-lg transition-colors'
                  >
                    Go to Home
                  </Link>
                </div>
              </div>
            ) : (
              <ActiveComponent handleNextFunc={handleNext} handleBackFunc={handleBack} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
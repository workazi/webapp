import React, { useState } from 'react'
import PersonalInfo from '../components/registrationpage/forms/PersonalInfo'
import ActivationPayment from '../components/registrationpage/forms/ActivationPayment'
import ProfileUpdate from '../components/registrationpage/forms/ProfileUpdate'
import EducationDetails from '../components/registrationpage/forms/EducationDetails'
import EmployeeSkills from '../components/registrationpage/forms/EmployeeSkills'
import PackageSelection from '../components/registrationpage/forms/PackageSelection'
import Preferences from '../components/registrationpage/forms/Preferences'

const STEPS = [
  { id: 1, title: 'Personal Info', component: PersonalInfo },
  { id: 2, title: 'Payment', component: ActivationPayment },
  { id: 3, title: 'Profile Layout', component: ProfileUpdate },
  { id: 4, title: 'Education', component: EducationDetails },
  { id: 5, title: 'Skills', component: EmployeeSkills },
  { id: 6, title: 'Package', component: PackageSelection },
  { id: 7, title: 'Preferences', component: Preferences }, 
  
 
]

export default function Registration() {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      console.log('Registration complete!')
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const ActiveComponent = STEPS[currentStep].component

  return (
    <div className='bg-gradient-to-r from-green-50 via-lime-50 to-white min-h-screen flex flex-col'>
      {/* 1. NAVIGATION BAR */}
      <nav className='px-8 py-4 bg-white/50 backdrop-blur-sm border-b border-gray-100 shrink-0'>
        <p className='font-bold text-2xl tracking-tight text-gray-800'>
          work<span className='text-green-500'>azi</span>
        </p>
      </nav>

      {/* 2. STEPPER SYSTEM (Positioned securely between Nav and Form) */}
      <div className='w-full max-w-5xl mx-auto px-4 pt-8 pb-4 hidden md:block'>
        <div className='relative flex items-center justify-between w-full'>
          
          {/* Background Track Line */}
          <div className='absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-200 -z-10' />
          
          {/* Dynamic Active Progress Line */}
          <div 
            className='absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-green-500 transition-all duration-500 ease-in-out -z-10' 
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          />

          {/* Stepper Nodes */}
          {STEPS.map((step, idx) => {
            const isCompleted = idx < currentStep
            const isActive = idx === currentStep

            return (
              <div key={step.id} className='flex flex-col items-center flex-1 relative'>
                {/* Circle Indicator */}
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
                    // Checkmark Icon for completed steps
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M5 13l4 4L19 7' />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>

                {/* Step Description text below circle */}
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

      {/* Fallback Simple Text Counter for Mobile Viewports */}
      <div className='md:hidden text-center pt-6 text-sm font-semibold text-gray-500'>
        Step <span className='text-green-600'>{currentStep + 1}</span> of {STEPS.length}: {STEPS[currentStep].title}
      </div>

      {/* 3. CORE FORM DISPLAY */}
      <div className='flex-1 flex items-start justify-center p-6 mt-6 md:mt-12'>
        <div className='bg-white p-8 w-full max-w-2xl shadow-xl rounded-2xl border border-gray-100 flex flex-col justify-between min-h-[450px]'>
          
          {/* Render Active Form Component */}
          <div className='mb-8'>
            <ActiveComponent />
          </div>

          {/* Action Footer */}
          <div className='flex justify-between items-center pt-4 border-t border-gray-100 shrink-0 mt-auto'>
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`px-5 py-2 rounded-lg font-medium transition-colors ${
                currentStep === 0
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              Back
            </button>

            <button
              onClick={handleNext}
              className='px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors shadow-sm'
            >
              {currentStep === STEPS.length - 1 ? 'Submit & Finish' : 'Next'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
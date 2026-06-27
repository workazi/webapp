import React from 'react'
import PersonalInfo from '../components/registrationpage/forms/PersonalInfo'
import ActivationPayment from '../components/registrationpage/forms/ActivationPayment'

export default function Registation() {
  return (
    <div className='bg-linear-to-r from-green-50 via-lime-50 to-white h-screen'>
        <nav className='px-8 py-4'>
            <p className='font-bold text-2xl'>work<span className='text-green-500'>azi</span></p>
        </nav>
        <div className='bg-white p-8 w-5/12 shadow-lg rounded-2xl'>
            <ActivationPayment />
        </div>
        
    </div>
  )
}

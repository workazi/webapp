import React, { useState, useEffect } from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextInput from '../../inputs/TextInput'
import FileInput from '../../inputs/FileInput'

const validationSchema = Yup.object().shape({
  id_number: Yup.string()
    .required('National ID is required')
    .matches(/^\d{7,8}$/, 'National ID must be between 7 and 8 digits'),
  id_front: Yup.mixed().required('Front side of ID is required'),
  id_back: Yup.mixed().required('Back side of ID is required'),
  county: Yup.string().required('Please select your county'),
  sub_county: Yup.string().required('Please select your sub-county'),
  area: Yup.string().optional(), // Optional field
})

export default function ProfileUpdate() {

  const [countiesData, setCountiesData] = useState([
    { id: 'nairobi', name: 'Nairobi', subCounties: ['Westlands', 'Kasarani', 'Kibra', 'Dagoretti'] },
    { id: 'mombasa', name: 'Mombasa', subCounties: ['Nyali', 'Changamwe', 'Kisauni', 'Likoni'] },
    { id: 'kisumu', name: 'Kisumu', subCounties: ['Kisumu Central', 'Kisumu East', 'Kisumu West', 'Nyando'] }
  ])

  const initialValues = {
    id_number: '',
    id_front: null,
    id_back: null,
    county: '',
    sub_county: '',
    area: '',
  }

  const handleSubmit = (values) => {
    console.log('Submitting profile updates:', values)
  }

  return (
    <div className='p-8'>
        <div>
            <h1 className='font-bold text-3xl py-2 text-gray-800'>Profile update</h1>
            <p className='text-gray-500 py-1'> This is additional information that will enable us verify your details and help us match you to the best job.</p>
        </div>

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue}) => {
                const selectedCountyData = countiesData.find(c => c.id === values.county)
                const availableSubCounties = selectedCountyData ? selectedCountyData.subCounties : []

                return (
                    <Form className='grid gap-4 py-4'>
                        {/* National ID */}
                        <div>
                            <TextInput name='id_number' placeholder='National ID' label='National ID' />
            
                        </div>

                        {/* ID File Uploads */}
                        <div>
                            <span className='font-bold text-sm text-gray-600 block mb-2'>Upload Identification documents</span>
                            <div className='grid grid-cols-2 gap-8 py-2'>
                                <div>
                                    <FileInput 
                                        label='Front side of ID' 
                                        name='id_front'
                                        onChange={(event) => setFieldValue('id_front', event.currentTarget.files[0])}
                                    />
                                    <ErrorMessage name="id_front" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div>
                                    <FileInput 
                                        label='Back side of ID' 
                                        name='id_back'
                                        onChange={(event) => setFieldValue('id_back', event.currentTarget.files[0])}
                                    />
                                    <ErrorMessage name="id_back" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            </div>
                        </div>

                        
                        <div className='grid grid-cols-2 gap-8'>
                            
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='county' className='font-bold text-sm text-gray-600'>County</label>
                                <Field
                                    as='select'
                                    name='county'
                                    className='p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                                    onChange={(e) => {
                                        const countyValue = e.target.value
                                        setFieldValue('county', countyValue)
                                        setFieldValue('sub_county', '') // Reset sub-county when county changes
                                    }}
                                >
                                    <option value=''>Select County</option>
                                    {countiesData.map((county) => (
                                        <option key={county.id} value={county.id}>
                                            {county.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="county" component="div" className="text-red-500 text-sm" />
                            </div>

                           
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='sub_county' className='font-bold text-sm text-gray-600'>Sub-County</label>
                                <Field
                                    as='select'
                                    name='sub_county'
                                    className='p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-200 disabled:cursor-not-allowed'
                                    disabled={!values.county}
                                >
                                    <option value=''>Select Sub-County</option>
                                    {availableSubCounties.map((sub) => (
                                        <option key={sub} value={sub.toLowerCase()}>
                                            {sub}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="sub_county" component="div" className="text-red-500 text-sm" />
                            </div>
                        </div>

                        
                        <div>
                            <TextInput 
                                name='area' 
                                placeholder='e.g. Kilimani, Stage-MPESA' 
                                label='Area / Landmark (Optional)' 
                            />
                        </div>

                      
                        <div className='pt-4'>
                            <button 
                                type='submit' 
                                className='w-full bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-lg transition-colors'
                            >
                                Save & Continue
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    </div>
  )
}
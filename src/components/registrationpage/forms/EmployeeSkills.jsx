import React, { useState } from 'react'
import { Form, Formik, Field, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextInput from '../../inputs/TextInput'
import FileInput from '../../inputs/FileInput'

// Validation Schema matching backend model fields
const validationSchema = Yup.object().shape({
  skill_entries: Yup.array().of(
    Yup.object().shape({
      skill: Yup.string().required('Please select a skill'),
      years_of_experience: Yup.number()
        .typeError('Years of experience must be a number')
        .required('Years of experience is required')
        .min(0, 'Experience cannot be negative')
        .integer('Please enter a whole number'),
      registration_number: Yup.string()
        .required('Registration or license number is required')
        .max(40, 'Registration number cannot exceed 40 characters'),
      certificate_upload: Yup.mixed().required('Please upload your certification or licensing document'),
    })
  ).min(1, 'Please add at least one skill')
})

export default function EmployeeSkills() {
  // Mock skills data mirroring what would arrive from a /api/skills/ endpoint
  const [availableSkills] = useState([
    { id: '1', name: 'Electrical Engineering' },
    { id: '2', name: 'Plumbing & Pipefitting' },
    { id: '3', name: 'Masonry & Bricklaying' },
    { id: '4', name: 'HVAC Installation' },
    { id: '5', name: 'Carpentry' },
    { id: '6', name: 'Welding & Fabrication' }
  ])

  // Template structure for an isolated skill entry instance
  const createEmptyEntry = () => ({
    skill: '',
    years_of_experience: '',
    registration_number: '',
    certificate_upload: null,
  })

  const initialValues = {
    skill_entries: [createEmptyEntry()] // Starts with one open block by default
  }

  const handleSubmit = (values) => {
    console.log('Payload matching backend fields:', values.skill_entries)
    // Remember to format as Multi-part FormData on submission due to file uploads
  }

  return (
    <div className='p-8'>
        <div>
            <h1 className='font-bold text-3xl py-2 text-gray-800'>Professional skills</h1>
            <p className='text-gray-500 py-1'>Declare your technical skills, experience metrics, and upload valid professional practicing licenses or certifications.</p>
        </div>

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue }) => (
                <Form className='mt-4 space-y-8'>
                    <FieldArray name="skill_entries">
                        {({ push, remove }) => (
                            <div className="space-y-8">
                                {values.skill_entries.map((entry, index) => (
                                    <div 
                                        key={index} 
                                        className={`space-y-4 ${index > 0 ? 'pt-6 border-t border-gray-200' : ''}`}
                                    >
                                        {/* Entry Context Header */}
                                        <div className='flex justify-between items-center bg-gray-50 p-2 rounded-lg'>
                                            <span className='font-bold text-sm text-gray-600 uppercase tracking-wider'>
                                                Skill Qualification #{index + 1}
                                            </span>
                                            {values.skill_entries.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
                                                >
                                                    Remove Skill
                                                </button>
                                            )}
                                        </div>

                                        {/* Skill and Experience Split Grid */}
                                        <div className='grid grid-cols-2 gap-8'>
                                            {/* Skill Selection Dropdown */}
                                            <div className='flex flex-col gap-1'>
                                                <label className='font-bold text-sm text-gray-600'>Select Skill</label>
                                                <Field
                                                    as='select'
                                                    name={`skill_entries.${index}.skill`}
                                                    className='p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                                                >
                                                    <option value=''>Choose a skill...</option>
                                                    {availableSkills.map((sk) => (
                                                        <option key={sk.id} value={sk.id}>
                                                            {sk.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name={`skill_entries.${index}.skill`} component="div" className="text-red-500 text-sm" />
                                            </div>

                                            {/* Years of Experience Input */}
                                            <div className='flex flex-col gap-1'>
                                                <label className='font-bold text-sm text-gray-600'>Years of Experience</label>
                                                <Field 
                                                    type="number" 
                                                    name={`skill_entries.${index}.years_of_experience`}
                                                    placeholder='e.g., 3'
                                                    className='p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' 
                                                />
                                                <ErrorMessage name={`skill_entries.${index}.years_of_experience`} component="div" className="text-red-500 text-sm" />
                                            </div>
                                        </div>

                                        {/* Registration / License Number Input */}
                                        <div className='flex flex-col gap-1'>
                                            <label className='font-bold text-sm text-gray-600'>Registration / License Number</label>
                                            <Field 
                                                type="text" 
                                                name={`skill_entries.${index}.registration_number`}
                                                placeholder='e.g., EBK-12345 or License ID'
                                                className='p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' 
                                            />
                                            <ErrorMessage name={`skill_entries.${index}.registration_number`} component="div" className="text-red-500 text-sm" />
                                        </div>

                                        {/* Dynamic Document File Upload */}
                                        <div>
                                            <FileInput 
                                                label='Upload Professional Certificate / License' 
                                                name={`skill_entries.${index}.certificate_upload`}
                                                onChange={(event) => 
                                                    setFieldValue(`skill_entries.${index}.certificate_upload`, event.currentTarget.files[0])
                                                }
                                            />
                                            <ErrorMessage name={`skill_entries.${index}.certificate_upload`} component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                    </div>
                                ))}

                                {/* Add More Button Alternative */}
                                <div className='pt-2'>
                                    <button
                                        type="button"
                                        onClick={() => push(createEmptyEntry())}
                                        className="w-full py-3 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg text-gray-600 font-bold hover:bg-gray-50 transition-all text-center"
                                    >
                                        + Add Another Professional Skill
                                    </button>
                                </div>
                            </div>
                        )}
                    </FieldArray>

                    {/* Form Submission Action Row */}
                    <div className='pt-4'>
                        <button 
                            type='submit' 
                            className='w-full bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-lg transition-colors'
                        >
                            Save Skill Qualifications
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
  )
}
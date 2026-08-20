import { useState, useEffect } from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import FileInput from '../../inputs/FileInput'
import { updateSkill } from '../../../api/auth'
import { getSkillOptions } from '../../../api/options'
import { useAuth } from '../../../context/AuthContext'

// Validation Schema matching backend model fields (endpoint accepts a single entry, not a list)
const validationSchema = Yup.object().shape({
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

const createEmptyEntry = () => ({
  skill: '',
  years_of_experience: '',
  registration_number: '',
  certificate_upload: null,
})

export default function EmployeeSkills({ handleNextFunc }) {
  const { user } = useAuth()
  const [availableSkills, setAvailableSkills] = useState([])
  const [skillsError, setSkillsError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [savedEntries, setSavedEntries] = useState([])

  useEffect(() => {
    const loadSkills = async () => {
      const response = await getSkillOptions()
      if (response.success) {
        setAvailableSkills(response.data)
      } else {
        setSkillsError('Could not load available skills. Please refresh the page.')
      }
    }
    loadSkills()
  }, [])

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitError('')

    if (!user?.id) {
      setSubmitError('Please log in again to continue.')
      setSubmitting(false)
      return
    }

    const formData = new FormData()
    formData.append('skill_id', values.skill)
    formData.append('years_of_experience', values.years_of_experience)
    formData.append('registration_number', values.registration_number)
    formData.append('certificate_upload', values.certificate_upload)

    const response = await updateSkill(user.id, formData)

    if (response.success) {
      setSavedEntries((prev) => [...prev, values])
      resetForm()
    } else {
      setSubmitError(response.data?.detail || 'Could not save skill. Please try again.')
    }
    setSubmitting(false)
  }

  return (
    <div className='p-8'>
        <div>
            <h1 className='font-bold text-3xl py-2 text-gray-800'>Professional skills</h1>
            <p className='text-gray-500 py-1'>Declare your technical skills, experience metrics, and upload valid professional practicing licenses or certifications. Save each skill before adding another.</p>
        </div>

        {skillsError && (
          <div className='my-4 p-3 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200'>
            {skillsError}
          </div>
        )}

        {submitError && (
          <div className='my-4 p-3 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200'>
            {submitError}
          </div>
        )}

        {savedEntries.length > 0 && (
          <div className='my-4 space-y-2'>
            {savedEntries.map((entry, index) => (
              <div key={index} className='p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between'>
                <span className='text-sm font-semibold text-green-700'>
                  {availableSkills.find((sk) => String(sk.id) === String(entry.skill))?.skill_name || 'Skill'} saved
                </span>
                <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M5 13l4 4L19 7' />
                </svg>
              </div>
            ))}
          </div>
        )}

        <Formik
            initialValues={createEmptyEntry()}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ setFieldValue, isSubmitting }) => (
                <Form className='mt-4 space-y-4'>
                    <div className='flex justify-between items-center bg-gray-50 p-2 rounded-lg'>
                        <span className='font-bold text-sm text-gray-600 uppercase tracking-wider'>
                            {savedEntries.length > 0 ? `Add Another Skill #${savedEntries.length + 1}` : 'Skill Qualification #1'}
                        </span>
                    </div>

                    {/* Skill and Experience Split Grid */}
                    <div className='grid grid-cols-2 gap-8'>
                        {/* Skill Selection Dropdown */}
                        <div className='flex flex-col gap-1'>
                            <label className='font-bold text-sm text-gray-600'>Select Skill</label>
                            <Field
                                as='select'
                                name='skill'
                                className='p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                            >
                                <option value=''>Choose a skill...</option>
                                {availableSkills.map((sk) => (
                                    <option key={sk.id} value={sk.id}>
                                        {sk.skill_name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name='skill' component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* Years of Experience Input */}
                        <div className='flex flex-col gap-1'>
                            <label className='font-bold text-sm text-gray-600'>Years of Experience</label>
                            <Field 
                                type="number" 
                                name='years_of_experience'
                                placeholder='e.g., 3'
                                className='p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' 
                            />
                            <ErrorMessage name='years_of_experience' component="div" className="text-red-500 text-sm" />
                        </div>
                    </div>

                    {/* Registration / License Number Input */}
                    <div className='flex flex-col gap-1'>
                        <label className='font-bold text-sm text-gray-600'>Registration / License Number</label>
                        <Field 
                            type="text" 
                            name='registration_number'
                            placeholder='e.g., EBK-12345 or License ID'
                            className='p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' 
                        />
                        <ErrorMessage name='registration_number' component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* Dynamic Document File Upload */}
                    <div>
                        <FileInput 
                            label='Upload Professional Certificate / License' 
                            name='certificate_upload'
                            onChange={(event) => 
                                setFieldValue('certificate_upload', event.currentTarget.files[0])
                            }
                        />
                        <ErrorMessage name='certificate_upload' component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    {/* Save Current Entry */}
                    <div className='pt-2'>
                        <button 
                            type='submit' 
                            disabled={isSubmitting}
                            className='w-full bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-lg transition-colors disabled:opacity-50'
                        >
                            {isSubmitting ? 'Saving...' : 'Save Skill'}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>

        {/* Continue Only Once At Least One Skill Is Saved */}
        <div className='pt-4'>
            <button 
                type='button' 
                onClick={handleNextFunc}
                disabled={savedEntries.length === 0}
                className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
                Continue
            </button>
        </div>
    </div>
  )
}

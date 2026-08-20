import { useState } from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import FileInput from '../../inputs/FileInput'
import { updateProfile } from '../../../api/auth'
import { useAuth } from '../../../context/AuthContext'

// Setup the Django choices mapped for the frontend dropdown
const EDUCATION_LEVELS = [
  { value: "1", label: "Kenya certificate of primary education" },
  { value: "2", label: "Kenya certificate of secondary education" },
  { value: "3", label: "Certificate" },
  { value: "4", label: "Diploma" },
  { value: "5", label: "Degree" },
  { value: "7", label: "Masters" },
  { value: "9", label: "PhD" },
  { value: "10", label: "Other" },
]

// Validation Schema matching backend model fields (endpoint accepts a single entry, not a list)
const validationSchema = Yup.object().shape({
  level: Yup.string().required('Education level is required'),
  start_date: Yup.date().required('Start date is required').max(new Date(), 'Start date cannot be in the future'),
  end_date: Yup.date()
    .required('End date is required')
    .min(Yup.ref('start_date'), 'End date must be after the start date'),
  certificate_upload: Yup.mixed().required('Please upload your certificate/result slip'),
  more_description: Yup.string()
    .max(10000, 'Description cannot exceed 10,000 characters')
    .required('Please provide a brief description of your studies'),
})

const createEmptyEntry = () => ({
  level: '',
  start_date: '',
  end_date: '',
  certificate_upload: null,
  more_description: '',
})

export default function EducationDetails({ handleNextFunc }) {
  const { user } = useAuth()
  const [submitError, setSubmitError] = useState('')
  const [savedEntries, setSavedEntries] = useState([])

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitError('')

    if (!user?.id) {
      setSubmitError('Please log in again to continue.')
      setSubmitting(false)
      return
    }

    const formData = new FormData()
    formData.append('level', values.level)
    formData.append('start_date', values.start_date)
    formData.append('end_date', values.end_date)
    formData.append('certificate_upload', values.certificate_upload)
    formData.append('more_description', values.more_description)

    const response = await updateProfile(user.id, formData)

    if (response.success) {
      setSavedEntries((prev) => [...prev, values])
      resetForm()
    } else {
      setSubmitError(response.data?.detail || 'Could not save education details. Please try again.')
    }
    setSubmitting(false)
  }

  return (
    <div className='p-8'>
        <div>
            <h1 className='font-bold text-3xl py-2 text-gray-800'>Education details</h1>
            <p className='text-gray-500 py-1'>Add your academic history and upload certifications to support your profile qualification. Save each qualification before adding another.</p>
        </div>

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
                  {EDUCATION_LEVELS.find((level) => level.value === entry.level)?.label || 'Qualification'} saved
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
                            {savedEntries.length > 0 ? `Add Another Qualification #${savedEntries.length + 1}` : 'Education Qualification #1'}
                        </span>
                    </div>

                    {/* Level Dropdown Selector */}
                    <div className='flex flex-col gap-1'>
                        <label className='font-bold text-sm text-gray-600'>Education Level</label>
                        <Field
                            as='select'
                            name='level'
                            className='p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                        >
                            <option value=''>Select level</option>
                            {EDUCATION_LEVELS.map((level) => (
                                <option key={level.value} value={level.value}>
                                    {level.label}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name='level' component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* Date Ranges Split */}
                    <div className='grid grid-cols-2 gap-8'>
                        <div className='flex flex-col gap-1'>
                            <label className='font-bold text-sm text-gray-600'>Start Date</label>
                            <Field 
                                type="date" 
                                name='start_date'
                                className='p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' 
                            />
                            <ErrorMessage name='start_date' component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='font-bold text-sm text-gray-600'>End Date (Graduation/Completion)</label>
                            <Field 
                                type="date" 
                                name='end_date'
                                className='p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' 
                            />
                            <ErrorMessage name='end_date' component="div" className="text-red-500 text-sm" />
                        </div>
                    </div>

                    {/* Dynamic Certificate File Upload */}
                    <div>
                        <FileInput 
                            label='Upload Certificate / Transcripts' 
                            name='certificate_upload'
                            onChange={(event) => 
                                setFieldValue('certificate_upload', event.currentTarget.files[0])
                            }
                        />
                        <ErrorMessage name='certificate_upload' component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    {/* Description Textarea Field */}
                    <div className='flex flex-col gap-1'>
                        <label className='font-bold text-sm text-gray-600'>More Description</label>
                        <Field
                            as='textarea'
                            rows={4}
                            placeholder='Provide details on core specializations, honors, major projects, or specific achievements...'
                            name='more_description'
                            className='p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none'
                        />
                        <ErrorMessage name='more_description' component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* Save Current Entry */}
                    <div className='pt-2'>
                        <button 
                            type='submit' 
                            disabled={isSubmitting}
                            className='w-full bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-lg transition-colors disabled:opacity-50'
                        >
                            {isSubmitting ? 'Saving...' : 'Save Qualification'}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>

        {/* Continue Only Once At Least One Qualification Is Saved */}
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
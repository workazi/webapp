import React from 'react'
import { Form, Formik, Field, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextInput from '../../inputs/TextInput'
import FileInput from '../../inputs/FileInput'

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

// Validation Schema matching backend model fields
const validationSchema = Yup.object().shape({
  education_entries: Yup.array().of(
    Yup.object().shape({
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
  ).min(1, 'Please add at least one education detail')
})

export default function EducationDetails() {
  // Initial structural template for a single education record block
  const createEmptyEntry = () => ({
    level: '',
    start_date: '',
    end_date: '',
    certificate_upload: null,
    more_description: '',
  })

  const initialValues = {
    education_entries: [createEmptyEntry()] // Starts with one entry open by default
  }

  const handleSubmit = (values) => {
    console.log('Payload matching backend fields:', values.education_entries)
    
    // Note: Because it contains files (FileField), prepare a Multi-part FormData object here:
    // const formData = new FormData();
    // values.education_entries.forEach((entry, index) => {
    //    formData.append(`education_entries[${index}]level`, entry.level);
    //    formData.append(`education_entries[${index}]certificate_upload`, entry.certificate_upload);
    //    ...etc
    // });
  }

  return (
    <div className='p-8'>
        <div>
            <h1 className='font-bold text-3xl py-2 text-gray-800'>Education details</h1>
            <p className='text-gray-500 py-1'>Add your academic history and upload certifications to support your profile qualification.</p>
        </div>

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue, errors, touched }) => (
                <Form className='mt-4 space-y-8'>
                    <FieldArray name="education_entries">
                        {({ push, remove }) => (
                            <div className="space-y-8">
                                {values.education_entries.map((entry, index) => (
                                    <div 
                                        key={index} 
                                        className={`space-y-4 ${index > 0 ? 'pt-6 border-t border-gray-200' : ''}`}
                                    >
                                        {/* Entry Header with Remove Capability */}
                                        <div className='flex justify-between items-center bg-gray-50 p-2 rounded-lg'>
                                            <span className='font-bold text-sm text-gray-600 uppercase tracking-wider'>
                                                Education Qualification #{index + 1}
                                            </span>
                                            {values.education_entries.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
                                                >
                                                    Remove Entry
                                                </button>
                                            )}
                                        </div>

                                        {/* Level Dropdown Selector */}
                                        <div className='flex flex-col gap-1'>
                                            <label className='font-bold text-sm text-gray-600'>Education Level</label>
                                            <Field
                                                as='select'
                                                name={`education_entries.${index}.level`}
                                                className='p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                                            >
                                                <option value=''>Select level</option>
                                                {EDUCATION_LEVELS.map((level) => (
                                                    <option key={level.value} value={level.value}>
                                                        {level.label}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name={`education_entries.${index}.level`} component="div" className="text-red-500 text-sm" />
                                        </div>

                                        {/* Date Ranges Split */}
                                        <div className='grid grid-cols-2 gap-8'>
                                            <div className='flex flex-col gap-1'>
                                                <label className='font-bold text-sm text-gray-600'>Start Date</label>
                                                <Field 
                                                    type="date" 
                                                    name={`education_entries.${index}.start_date`}
                                                    className='p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' 
                                                />
                                                <ErrorMessage name={`education_entries.${index}.start_date`} component="div" className="text-red-500 text-sm" />
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                <label className='font-bold text-sm text-gray-600'>End Date (Graduation/Completion)</label>
                                                <Field 
                                                    type="date" 
                                                    name={`education_entries.${index}.end_date`}
                                                    className='p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' 
                                                />
                                                <ErrorMessage name={`education_entries.${index}.end_date`} component="div" className="text-red-500 text-sm" />
                                            </div>
                                        </div>

                                        {/* Dynamic Certificate File Upload */}
                                        <div>
                                            <FileInput 
                                                label='Upload Certificate / Transcripts' 
                                                name={`education_entries.${index}.certificate_upload`}
                                                onChange={(event) => 
                                                    setFieldValue(`education_entries.${index}.certificate_upload`, event.currentTarget.files[0])
                                                }
                                            />
                                            <ErrorMessage name={`education_entries.${index}.certificate_upload`} component="div" className="text-red-500 text-sm mt-1" />
                                        </div>

                                        {/* Description Textarea Field */}
                                        <div className='flex flex-col gap-1'>
                                            <label className='font-bold text-sm text-gray-600'>More Description</label>
                                            <Field
                                                as='textarea'
                                                rows={4}
                                                placeholder='Provide details on core specializations, honors, major projects, or specific achievements...'
                                                name={`education_entries.${index}.more_description`}
                                                className='p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none'
                                            />
                                            <ErrorMessage name={`education_entries.${index}.more_description`} component="div" className="text-red-500 text-sm" />
                                        </div>
                                    </div>
                                ))}

                                {/* Add More Button Option */}
                                <div className='pt-2'>
                                    <button
                                        type="button"
                                        onClick={() => push(createEmptyEntry())}
                                        className="w-full py-3 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg text-gray-600 font-bold hover:bg-gray-50 transition-all text-center"
                                    >
                                        + Add Another Academic Qualification
                                    </button>
                                </div>
                            </div>
                        )}
                    </FieldArray>

                    {/* Global Form Submission Trigger */}
                    <div className='pt-4'>
                        <button 
                            type='submit' 
                            className='w-full bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-lg transition-colors'
                        >
                            Save Education Details
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
  )
}
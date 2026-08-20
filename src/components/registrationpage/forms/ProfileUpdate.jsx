import { useState, useEffect } from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextInput from '../../inputs/TextInput'
import FileInput from '../../inputs/FileInput'
import { updateAccount } from '../../../api/auth'
import { getLocations } from '../../../api/options'
import { useAuth } from '../../../context/AuthContext'

const validationSchema = Yup.object().shape({
  id_number: Yup.string()
    .required('National ID is required')
    .matches(/^\d{7,8}$/, 'National ID must be between 7 and 8 digits'),
  id_front: Yup.mixed().required('Front side of ID is required'),
  id_back: Yup.mixed().required('Back side of ID is required'),
  county: Yup.string().required('Please select your county'),
  location: Yup.string().required('Please select your sub-county'),
  area: Yup.string().optional(), // Optional field
})

export default function ProfileUpdate({ handleNextFunc }) {
  const { user } = useAuth()
  const [locations, setLocations] = useState([])
  const [locationsError, setLocationsError] = useState('')
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    const loadLocations = async () => {
      const response = await getLocations()
      if (response.success) {
        setLocations(response.data)
      } else {
        setLocationsError('Could not load counties. Please refresh the page.')
      }
    }
    loadLocations()
  }, [])

  const counties = [...new Set(locations.map((loc) => loc.county))]

  const initialValues = {
    id_number: '',
    id_front: null,
    id_back: null,
    county: '',
    location: '',
    area: '',
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitError('')

    if (!user?.id) {
      setSubmitError('Please log in again to continue.')
      setSubmitting(false)
      return
    }

    const payload = {
      phone_number: values.phone_number,
      email: values.email,
      location: Number(values.location),
      area: values.area,
      id_number: Number(values.id_number),
    }

    const response = await updateAccount(user.id, payload)

    if (response.success) {
      handleNextFunc()
    } else {
      setSubmitError(response.data?.detail || 'Could not update profile. Please try again.')
    }
    setSubmitting(false)
  }

  return (
    <div className='p-8'>
        <div>
            <h1 className='font-bold text-3xl py-2 text-gray-800'>Profile update</h1>
            <p className='text-gray-500 py-1'> This is additional information that will enable us verify your details and help us match you to the best job.</p>
        </div>

        {locationsError && (
          <div className='my-4 p-3 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200'>
            {locationsError}
          </div>
        )}

        {submitError && (
          <div className='my-4 p-3 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200'>
            {submitError}
          </div>
        )}

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ values, setFieldValue, isSubmitting }) => {
                const availableSubCounties = locations.filter((loc) => loc.county === values.county)

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
                                </div>
                                <div>
                                    <FileInput 
                                        label='Back side of ID' 
                                        name='id_back'
                                        onChange={(event) => setFieldValue('id_back', event.currentTarget.files[0])}
                                    />
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
                                        setFieldValue('location', '') // Reset sub-county when county changes
                                    }}
                                >
                                    <option value=''>Select County</option>
                                    {counties.map((county) => (
                                        <option key={county} value={county}>
                                            {county}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="county" component="div" className="text-red-500 text-sm" />
                            </div>

                           
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='location' className='font-bold text-sm text-gray-600'>Sub-County</label>
                                <Field
                                    as='select'
                                    name='location'
                                    className='p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-200 disabled:cursor-not-allowed'
                                    disabled={!values.county}
                                >
                                    <option value=''>Select Sub-County</option>
                                    {availableSubCounties.map((loc) => (
                                        <option key={loc.id} value={loc.id}>
                                            {loc.subcounty}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
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
                                disabled={isSubmitting}
                                className='w-full bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-lg transition-colors disabled:opacity-50'
                            >
                                {isSubmitting ? 'Saving...' : 'Save & Continue'}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    </div>
  )
}
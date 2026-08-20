import { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { getJobPreferences, updateJobPreferences } from '../../../api/auth'

const DEFAULT_PREFERENCES = {
  auto_apply: false,
  notify: true,
  notification_method: 'sms',
}

const ALLOWED_METHODS = ['sms', 'email', 'none']

const normalizePreferences = (value) => {
  const next = {
    ...DEFAULT_PREFERENCES,
    ...(value || {}),
  }

  if (typeof next.auto_apply !== 'boolean') {
    next.auto_apply = Boolean(next.auto_apply)
  }

  if (typeof next.notify !== 'boolean') {
    next.notify = Boolean(next.notify)
  }

  if (!ALLOWED_METHODS.includes(next.notification_method)) {
    next.notification_method = next.notify ? 'sms' : 'none'
  }

  if (!next.notify) {
    next.notification_method = 'none'
  }

  return next
}

export default function Preferences() {
  const [initialValues, setInitialValues] = useState(DEFAULT_PREFERENCES)
  const [savedPreferences, setSavedPreferences] = useState(DEFAULT_PREFERENCES)
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState({ type: '', message: '' })

  useEffect(() => {
    let isMounted = true

    const loadPreferences = async () => {
      setStatus({ type: '', message: '' })
      setIsLoading(true)

      const response = await getJobPreferences()

      if (!isMounted) return

      if (response.success) {
        const normalized = normalizePreferences(response.data)
        setSavedPreferences(normalized)
        setInitialValues(normalized)
        setStatus({ type: 'success', message: 'Your saved preferences have been loaded.' })
      } else {
        const detail = response.data?.detail || response.data?.message || 'Could not load your job preferences.'
        setStatus({ type: 'error', message: detail })
      }

      setIsLoading(false)
    }

    loadPreferences()

    return () => {
      isMounted = false
    }
  }, [])

  const handleSubmit = async (values, { setSubmitting }) => {
    const sanitizedValues = normalizePreferences(values)
    const changedFields = {}

    Object.keys(sanitizedValues).forEach((key) => {
      if (savedPreferences[key] !== sanitizedValues[key]) {
        changedFields[key] = sanitizedValues[key]
      }
    })

    if (Object.keys(changedFields).length === 0) {
      setStatus({ type: 'success', message: 'No changes to save.' })
      setSubmitting(false)
      return
    }

    setStatus({ type: '', message: '' })
    const response = await updateJobPreferences(changedFields)

    if (response.success) {
      const updatedValues = normalizePreferences({
        ...savedPreferences,
        ...response.data,
      })

      setSavedPreferences(updatedValues)
      setInitialValues(updatedValues)
      setStatus({
        type: 'success',
        message: response.data?.detail || 'Job notification preferences saved successfully.',
      })
    } else {
      const detail = response.data?.detail || response.data?.message || 'Could not save your job preferences.'
      setStatus({ type: 'error', message: detail })
    }

    setSubmitting(false)
  }

  return (
    <div className='grid gap-8'>
      <div className='grid gap-2'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Job notification preferences</h1>
        <p className='text-gray-500 leading-relaxed'>
          Choose how we should contact you about relevant jobs and whether you want the system to apply automatically.
        </p>
      </div>

      {status.message && (
        <div
          className={`p-3 rounded-lg text-sm font-medium border ${
            status.type === 'success'
              ? 'bg-green-50 text-green-700 border-green-200'
              : status.type === 'error'
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-yellow-50 text-yellow-700 border-yellow-200'
          }`}
        >
          {status.message}
        </div>
      )}

      {isLoading ? (
        <div className='rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600'>
          Loading your job notification settings...
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className='grid gap-8'>
              <div className='grid gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4'>
                <label className='font-semibold text-gray-800 text-base block leading-snug'>
                  Would you like to automatically apply for matching jobs?
                </label>

                <label className='flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 cursor-pointer'>
                  <span className='text-sm font-medium text-gray-700'>Auto apply</span>
                  <Field
                    type='checkbox'
                    name='auto_apply'
                    className='h-5 w-5 accent-green-600'
                    checked={Boolean(values.auto_apply)}
                    onChange={(event) => setFieldValue('auto_apply', event.target.checked)}
                  />
                </label>
              </div>

              <div className='grid gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4'>
                <label className='font-semibold text-gray-800 text-base block leading-snug'>
                  Would you like to receive job alerts and notifications?
                </label>

                <label className='flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 cursor-pointer'>
                  <span className='text-sm font-medium text-gray-700'>Notify me</span>
                  <Field
                    type='checkbox'
                    name='notify'
                    className='h-5 w-5 accent-green-600'
                    checked={Boolean(values.notify)}
                    onChange={(event) => {
                      const checked = event.target.checked
                      setFieldValue('notify', checked)

                      if (!checked) {
                        setFieldValue('notification_method', 'none')
                      }
                    }}
                  />
                </label>
              </div>

              <div className='grid gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4'>
                <label className='font-semibold text-gray-800 text-base block leading-snug'>
                  Preferred notification channel
                </label>

                <div className='grid gap-3'>
                  {ALLOWED_METHODS.map((method) => (
                    <label
                      key={method}
                      className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-all ${
                        values.notification_method === method
                          ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500/20'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Field
                        type='radio'
                        name='notification_method'
                        value={method}
                        className='h-4 w-4 accent-green-600'
                        onChange={(event) => {
                          const nextValue = event.target.value
                          setFieldValue('notification_method', nextValue)

                          if (nextValue !== 'none') {
                            setFieldValue('notify', true)
                          }
                        }}
                      />
                      <span className='text-sm font-medium capitalize'>
                        {method === 'none' ? 'No notifications' : method}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type='submit'
                disabled={isSubmitting || isLoading}
                className='w-full rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60'
              >
                {isSubmitting ? 'Saving preferences...' : 'Save preferences'}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  )
}
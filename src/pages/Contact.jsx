import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import NavigationBar from '../components/homepage/NavigationBar'
import Footer from '../components/homepage/Footer'
import { FaEnvelope, FaHeadset, FaClock } from 'react-icons/fa6'
import { IoIosCloudUpload } from 'react-icons/io'
import TextInput from '../components/inputs/TextInput' 

// Import your network utility function
import { supportRequest } from '../api/support'

export default function Contact() {
  
  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    inquiry_type: yup.string().required('Please select an option'),
    subject: yup.string().required('Subject is required').min(4, 'Subject is too short'),
    message: yup.string().required('Message cannot be empty').min(10, 'Message is too short'),
    screenshot: yup.mixed().nullable()
  })

  const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
    // Clear any existing alert status strings before running a request
    setStatus(null);

    let payload = values;

    // If a file upload is included, wrap everything into a FormData instance
    if (values.screenshot) {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('inquiry_type', values.inquiry_type);
      formData.append('subject', values.subject);
      formData.append('message', values.message);
      formData.append('screenshot', values.screenshot);
      payload = formData;
    }

    const response = await supportRequest(payload);

    if (response.success) {
      setStatus({ success: 'Your message has been sent successfully! We will get back to you soon.' });
      resetForm();
    } else {
      // Pull specific backend error messages if available, else fall back to a standard string
      const errorMessage = response.data?.message || 'Failed to send your request. Please try again later.';
      setStatus({ error: errorMessage });
    }

    setSubmitting(false);

    // Auto-clear success or error message after 10 seconds (10000ms)
    setTimeout(() => {
      setStatus(null);
    }, 10000);
  }

  return (
    <div className="bg-linear-to-br from-green-50 via-lime-50 to-white min-h-screen">
      <NavigationBar />

      {/* Header section */}
      <header className="mx-auto max-w-7xl px-6 pb-8 pt-12 text-center md:px-10 lg:px-16 lg:pt-16">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Contact us</p>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
          Get in touch with Workazi
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
          Send us a message or reach us directly through the emails below. We&apos;re here to help with jobs, listings and support.
        </p>
      </header>

      {/* Main Core Body Segment */}
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-16 md:px-10 lg:flex-row lg:items-start lg:gap-16 lg:px-16 lg:pb-20">
        
        {/* Left Hand side: Form Container */}
        <div className="space-y-6 lg:w-7/12">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6 lg:p-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Send us a message</h2>
            
            <Formik
              initialValues={{
                name: '',
                email: '',
                inquiry_type: 'general',
                subject: '',
                message: '',
                screenshot: null,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, handleChange, handleBlur, isSubmitting, status }) => (
                <Form className="flex flex-col gap-4 text-left">
                  
                  {/* Global Success / Error Alerts placeholders */}
                  {status?.success && (
                    <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700 font-medium transition-all duration-300 animate-fade-in">
                      {status.success}
                    </div>
                  )}

                  {status?.error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-medium transition-all duration-300 animate-fade-in">
                      {status.error}
                    </div>
                  )}
                  
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextInput name="name" type="text" placeHolder="Full name" />
                    <TextInput name="email" type="email" placeHolder="Email address" />
                  </div>

                  {/* Inquiry Segmentation Path Buttons */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Reason for Contacting Us *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFieldValue('inquiry_type', 'general')}
                        className={`py-3 px-4 text-sm font-semibold border rounded-xl cursor-pointer transition-all text-center ${
                          values.inquiry_type === 'general'
                            ? 'border-green-500 bg-green-50 text-green-700 shadow-xs'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        General Inquiry
                      </button>
                      <button
                        type="button"
                        onClick={() => setFieldValue('inquiry_type', 'support')}
                        className={`py-3 px-4 text-sm font-semibold border rounded-xl cursor-pointer transition-all text-center ${
                          values.inquiry_type === 'support'
                            ? 'border-green-500 bg-green-50 text-green-700 shadow-xs'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Technical Support
                      </button>
                    </div>
                    <Field type="hidden" name="inquiry_type" />
                  </div>

                  {/* Subject Input Row */}
                  <TextInput name="subject" type="text" placeHolder="Subject or reason summary" />

                  {/* Conditional File Upload Block */}
                  {values.inquiry_type === 'support' && (
                    <div className="flex flex-col gap-1.5 animate-fade-in">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Upload Screenshot / Error Log (Optional)
                      </label>
                      <label className="w-full flex items-center justify-between border-2 border-dashed border-slate-200 hover:border-green-500 bg-slate-50/50 hover:bg-white px-4 py-3 rounded-xl cursor-pointer transition-all">
                        <div className="flex items-center gap-2.5 text-slate-500 overflow-hidden">
                          <IoIosCloudUpload size={20} className="text-slate-400 shrink-0" />
                          <span className="text-sm truncate max-w-60 sm:max-w-xs">
                            {values.screenshot ? values.screenshot.name : 'Attach visual proof of issue'}
                          </span>
                        </div>
                        <span className="text-xs bg-slate-200 text-slate-600 px-2.5 py-1 rounded-md font-semibold shrink-0">
                          Browse
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) => {
                            setFieldValue('screenshot', event.currentTarget.files[0])
                          }}
                        />
                      </label>
                    </div>
                  )}

                  {/* Message Input Box */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {values.inquiry_type === 'support' ? 'Describe the Issue *' : 'Your Message *'}
                    </label>
                    <textarea
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={
                        values.inquiry_type === 'support'
                          ? "Please clarify step-by-step what occurred so our engine support personnel can reproduce it..."
                          : "Type your message or custom inquiry instructions here..."
                      }
                      className="w-full bg-slate-50/50 border border-slate-200 text-slate-700 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm h-32 outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all resize-none"
                    />
                    <ErrorMessage name="message" component="span" className="text-xs text-red-500 pl-1 font-medium" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 px-4 font-bold text-white bg-green-500 hover:bg-green-600 disabled:bg-slate-200 rounded-xl transition-all shadow-md shadow-green-500/10 cursor-pointer text-center disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending Request...' : 'Send Message'}
                  </button>

                </Form>
              )}
            </Formik>

          </div>
        </div>

        {/* Right Hand Side: Contact Info */}
        <div className="space-y-6 lg:w-5/12 text-left">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-slate-900">Email contacts</h2>
            <div className="mt-6 space-y-4">
              <a
                href="mailto:info@workazi.ke"
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-green-300 hover:bg-green-50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white">
                  <FaEnvelope />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Contact email</p>
                  <p className="text-sm text-slate-600">info@workazi.ke</p>
                </div>
              </a>

              <a
                href="mailto:help@workazi.ke"
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-green-300 hover:bg-green-50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white">
                  <FaHeadset />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Support email</p>
                  <p className="text-sm text-slate-600">help@workazi.ke</p>
                </div>
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white">
                <FaClock />
              </span>
              <h2 className="text-xl font-bold text-slate-900">Working hours</h2>
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
              <p>Saturday: 9:00 AM - 1:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  )
}
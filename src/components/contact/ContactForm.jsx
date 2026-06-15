import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

export default function ContactForm() {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Invalid email!')
      .required('Email is required'),

    phone_number: yup
      .string()
      .min(9, 'Too short!')
      .max(12, 'Invalid phone number!')
      .required('Phone number is required'),

    message: yup
      .string()
      .min(8, 'Too short!')
      .max(400, 'Too long!')
      .required('Message is required'),

    first_name: yup
      .string()
      .min(3, 'Too short!')
      .max(60, 'Too long!')
      .required('First name is required'),

    last_name: yup
      .string()
      .min(3, 'Too short!')
      .max(60, 'Too long!')
      .required('Last name is required'),
  });

  return (
    <Formik
      initialValues={{
        email: '',
        phone_number: '',
        message: '',
        first_name: '',
        last_name: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form className="mx-auto grid w-full max-w-3xl gap-5 rounded-3xl ">
        <div className="grid grid-cols-2 gap-2">
          <div className="grid gap-2">
            <label htmlFor="first_name" className="text-sm font-semibold text-slate-700">First name</label>
            <Field
              id="first_name"
              name="first_name"
              placeholder="First Name"
              className="rounded-xl border w-full border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />
            <ErrorMessage name="first_name" component="div" className="text-sm text-red-500" />
          </div>

          <div className="grid gap-2">
            <label htmlFor="last_name" className="text-sm font-semibold text-slate-700">Last name</label>
            <Field
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              className="rounded-xl border w-full border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />
            <ErrorMessage name="last_name" component="div" className="text-sm text-red-500" />
          </div>
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</label>
          <Field
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
          />
          <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
        </div>

        <div className="grid gap-2">
          <label htmlFor="phone_number" className="text-sm font-semibold text-slate-700">Phone number</label>
          <Field
            id="phone_number"
            name="phone_number"
            placeholder="Phone Number"
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
          />
          <ErrorMessage name="phone_number" component="div" className="text-sm text-red-500" />
        </div>

        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm font-semibold text-slate-700">Message</label>
          <Field
            as="textarea"
            id="message"
            name="message"
            placeholder="Write your message here"
            rows="5"
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
          />
          <ErrorMessage name="message" component="div" className="text-sm text-red-500" />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-green-700"
        >
          Submit message
        </button>
      </Form>
    </Formik>
  );
}
export default function TextInput({
  label,
  placeholder = "",
  type = "text",
  className = "",
  // Formik props
  field,
  form,
  ...props
}) {
  const isFormik = !!field
  const hasError = isFormik && form?.touched[field.name] && form?.errors[field.name]

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        {...(isFormik ? field : {})}
        {...props}
        className={`px-4 py-2.5 border-2 rounded-lg font-medium outline-none transition-all duration-200 placeholder-gray-400 focus:border-[#00c24e] focus:shadow-sm ${
          hasError
            ? 'border-red-500 text-red-900 focus:border-red-600'
            : 'border-gray-200 text-gray-900 hover:border-gray-300'
        }`}
      />
      {hasError && (
        <span className="text-sm text-red-600 font-medium">
          {form.errors[field.name]}
        </span>
      )}
    </div>
  )
}

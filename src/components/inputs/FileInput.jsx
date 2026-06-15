import { useState, useRef } from 'react'

const FileIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

export default function FileInput({ 
  accept = "*", 
  multiple = false,
  label = "Choose file",
  className = "",
  // Formik props
  field,
  form,
  onFileSelect
}) {
  const [fileName, setFileName] = useState("")
  const fileInputRef = useRef(null)
  const isFormik = !!field
  const hasError = isFormik && form?.touched[field.name] && form?.errors[field.name]

  const handleFileChange = (e) => {
    const files = e.target.files
    if (files) {
      if (multiple) {
        setFileName(`${files.length} file(s) selected`)
      } else {
        setFileName(files[0].name)
      }
      
      // Call Formik's onChange if available
      if (isFormik) {
        form?.setFieldValue(field.name, files)
      }
      
      // Call custom callback
      onFileSelect?.(multiple ? files : files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        onBlur={isFormik ? form?.setFieldTouched(field.name) : undefined}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-2 justify-center px-6 py-2.5 bg-gradient-to-r from-[#00c24e] to-[#00a540] hover:from-[#00a540] hover:to-[#008a37] text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 ${
          hasError ? 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' : ''
        }`}
      >
        <FileIcon className="w-5 h-5" />
        {label}
      </button>
      {fileName && (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
          <FileIcon className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            {fileName}
          </span>
        </div>
      )}
      {hasError && (
        <span className="text-sm text-red-600 font-medium">
          {form.errors[field.name]}
        </span>
      )}
    </div>
  )
}

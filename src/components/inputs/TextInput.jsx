import { Field, ErrorMessage } from "formik";

export default function TextInput({
  label,
  name,                // Required for Formik to track this input's state
  placeholder = "",
  type = "text",
  className = "",
  ...props             // Passes any extra props (like id, disabled, etc.) down to Field
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label 
          htmlFor={props.id || name} 
          className="text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
      )}
      
      <Field
        id={props.id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        {...props}
        children={({ field, meta }) => {
          const hasError = meta.touched && meta.error;
          return (
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              {...props}
              className={`px-4 py-2.5 border-2 rounded-lg font-medium outline-none transition-all duration-200 placeholder-gray-400 focus:border-[#00c24e] focus:shadow-sm ${
                hasError
                  ? 'border-red-500 text-red-900 focus:border-red-600'
                  : 'border-gray-200 text-gray-900 hover:border-gray-300'
              }`}
            />
          );
        }}
      />
      <ErrorMessage 
        name={name} 
        component="span" 
        className="text-xs font-medium text-red-500 mt-1" 
      />
    </div>
  );
}
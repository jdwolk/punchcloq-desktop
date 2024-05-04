import { FieldErrors } from "react-hook-form"

import mainStyles from '../../styles.module.css';

interface IInputProps {
  inputType?: string;
  placeholder?: string;
}

interface ILabelProps {
  htmlFor: string;
}

interface ITextFieldProps<FormValuesType> {
  name: keyof FormValuesType;
  inputProps?: IInputProps;
  labelProps?: ILabelProps;
  errors?: FieldErrors<FormValuesType>
  children: React.ReactNode;
}

function TextField<FormValues>({ name, inputProps, labelProps, children, errors }: ITextFieldProps<FormValues>) {
  const { inputType: givenInputType, ...otherInputProps } = inputProps;
  const inputType = givenInputType || 'text';
  const fieldError = errors?.[name];

  return (
    <div className={mainStyles.formField}>
      <label htmlFor={name} {...labelProps}>{children}</label>
      <input type={inputType} {...otherInputProps} />
      {fieldError && (
        <p className={mainStyles.errorText}>{`${fieldError.message}`}</p>
      )}
    </div>
  )
}


export default TextField;

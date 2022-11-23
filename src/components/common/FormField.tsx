
import { useField } from "formik"
import { FormFieldProps } from "../../props/FormFieldProps"

export const FormField = ({ type, placeholder, name, onValueChange }: FormFieldProps) => {
    const [field, meta] = useField(name)
    return (
        <>
            <input
                onKeyUp={onValueChange}
                onInput={onValueChange}
                type={type ? type : "text"}
                className="form-control mb-2 bg-light"
                {...field}
                name={name}
                placeholder={placeholder} />
                {meta.touched && meta.error ? (
                    <p className="error"> {meta.error} </p>
                ) : null}
        </>

    )
}
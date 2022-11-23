import { useField } from "formik"

export const FormNumericField: React.FC<{
    placeholder: string,
    name: string,
    max?: number,
    min?: number
    onInput: (value: string) => void,    
}> = ({ placeholder, name, onInput, min, max }) => {
    const [field, meta] = useField(name)
    return (
        <>
            <input                
                onInput={(e) => onInput(e.currentTarget.value)}
                type="number"
                className="form-control mb-2 bg-light"
                {...field}
                min={min}
                max={max}
                name={name}
                placeholder={placeholder} />
                {meta.touched && meta.error ? (
                    <p className="error"> {meta.error} </p>
                ) : null}
        </>

    )
}
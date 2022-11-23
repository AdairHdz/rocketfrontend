import { useField } from "formik"
import { FormSelectProps } from "../../props/FormSelectProps"

export const FormSelect = ({options, name, onSelect}: FormSelectProps) => {    
    const [field] = useField(name)
    return (
        <select 
        {...field}
        onChange={(e) => {
            field.onChange(e)
            onSelect(parseInt(e.currentTarget!.value))
        }} className="form-control mb-2 bg-light">
                <option disabled value="">Mes</option>
                {options.map((option) => (
                    <option value={option.value} key={option.value}> {option.name} </option>
                ))}
            </select>
    )
}
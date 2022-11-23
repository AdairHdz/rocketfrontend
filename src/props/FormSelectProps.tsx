export interface FormSelectProps {
    name: string
    options: {name: string, value: number}[]
    onSelect: (value: number) => void
}
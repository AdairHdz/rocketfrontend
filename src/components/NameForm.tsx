
import { FormikProps } from "formik"
import { useState } from "react"
import { User } from "../models/User"
import { FormField } from "./common/FormField"
import { FormSection } from "./layout/FormSection"

export const NameForm = (props: { innerRef: React.RefObject<FormikProps<User>> }) => {

    const [fullName, setFullName] = useState<string>("")

    const formatName = () => {
        const currentRef = props.innerRef.current
        if (!currentRef) {
            return
        }

        const values = currentRef.values
        let result = ""
        result = values.firstName + " " + values.middleName + " " + values.lastName + " " + values.mothersLastName
        setFullName(result)
    }

    return (
        <FormSection
            title="¿Cuál es tu nombre?"
            overview={(
                <>
                    {fullName !== "" && <p> {fullName} </p>}
                </>
            )}>
            <FormField name="firstName" placeholder="Nombre" onValueChange={formatName} />
            <FormField name="middleName" placeholder="Segundo nombre" onValueChange={formatName} />
            <FormField name="lastName" placeholder="Apellido paterno" onValueChange={formatName} />
            <FormField name="mothersLastName" placeholder="Apellido materno" onValueChange={formatName} />
        </FormSection>
    )
}
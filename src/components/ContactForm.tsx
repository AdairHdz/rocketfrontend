import { FormikProps } from "formik"
import React, { useState } from "react"
import { User } from "../models/User"
import { FormField } from "./common/FormField"
import './ContactForm.css'
import { FormSection } from "./layout/FormSection"

type ContactInfo = {
    email?: string
    phoneNumber?: string
}

export const ContactForm = (props: { innerRef: React.RefObject<FormikProps<User>> }) => {
    
    const [contactInfo, setContactInfo] = useState<ContactInfo>()

    const setPhoneNumber = () => {
        setContactInfo((prevState) => {
            return {
                ...prevState,
                phoneNumber: props.innerRef.current!.values.phone
            }            
        })
    }

    const setEmail = () => {
        setContactInfo((prevState) => {
            return {
                ...prevState,
                email: props.innerRef.current!.values.email,                
            }
            
        })
    }

    return (        
        <FormSection title="Datos de contacto" overview={(
            <>
                {contactInfo && contactInfo.email && <p> Correo electrónico: {contactInfo.email} </p>}
                {contactInfo && contactInfo.phoneNumber && <p> Número de celular: {contactInfo.phoneNumber} </p>}
            </>
        )}>
            <FormField name="email" type="email" placeholder="Correo electrónico" onValueChange={setEmail} />
            <FormField name="phone" type="text" placeholder="Teléfono celular" onValueChange={setPhoneNumber} />
        </FormSection>
    )
}
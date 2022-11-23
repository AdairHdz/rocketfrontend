import { ContactForm } from "./ContactForm"
import { DateOfBirthForm } from "./DateOfBirthForm"
import { NameForm } from "./NameForm"
import { Formik, Form, FormikProps } from "formik"
import { User } from "../models/User"
import * as Yup from "yup"
import './UserFormContainer.css'
import { useRef, useState } from "react"
import { UserService } from "../services/UserService"
import { UserDTO } from "../data-transfer-objects/UserDTO"
import { UserFormHeader } from "./UserFormHeader"

const requiredField = "Campo obligatorio"
const maxLength = (length: number) => {
    return `${length} caracteres máximo`
}

const userSchema = Yup.object().shape({
    firstName: Yup.string()
        .required(requiredField)
        .matches(new RegExp(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/), "Sólo letras. No se permiten números ni caracteres especiales")
        .max(30, maxLength(30)),
    middleName: Yup.string()
        .optional()
        .matches(new RegExp(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/), "Sólo letras. No se permiten números ni caracteres especiales")
        .max(30, maxLength(30)),
    lastName: Yup.string()
        .required(requiredField)
        .matches(new RegExp(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/), "Sólo letras. No se permiten números ni caracteres especiales")
        .max(30, maxLength(30)),
    mothersLastName: Yup.string()
        .optional()
        .matches(new RegExp(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/), "Sólo letras. No se permiten números ni caracteres especiales")
        .max(30, maxLength(30)),
    dayOfBirth: Yup.number()
        .required(requiredField)
        .min(1)
        .when(['monthOfBirth', 'yearOfBirth'], {
            is: (monthOfBirth: number, yearOfBirth: number) => (monthOfBirth === 2 && yearOfBirth % 4 === 0),
            then: (schema) => schema.max(29, "Sólo hay 29 días en febrero"),
            otherwise: (schema) => schema.when(['monthOfBirth', 'yearOfBirth'], {
                is: (monthOfBirth: number, yearOfBirth: number) => (monthOfBirth === 2 && yearOfBirth % 4 !== 0),
                then: (schema) => schema.max(28, "Sólo hay 28 días en febrero"),
                otherwise: (schema) => schema.when(['monthOfBirth', 'yearOfBirth'], {
                    is: (monthOfBirth: number, yearOfBirth: number) => (monthOfBirth === new Date().getMonth() + 1 && yearOfBirth === new Date().getFullYear()),
                    then: (schema) => schema.max(new Date().getDate(), "Día no válido"),
                    otherwise: (schema) => schema.when('monthOfBirth', {
                        is: (monthOfBirth: number) => monthOfBirth === 1 || monthOfBirth === 3 || monthOfBirth === 5 || monthOfBirth === 7 || monthOfBirth === 8 || monthOfBirth === 10 || monthOfBirth === 12,
                        then: (schema) => schema.max(31, "Este mes sólo tiene 31 días"),
                        otherwise: (schema) => schema.max(30, "Este més sólo tiene 30 días")
                    })
                })
            })
        }),
    monthOfBirth: Yup.number()
        .required(requiredField)
        .min(1, "Mes no válido")
        .when('yearOfBirth', {
            is: new Date().getFullYear(),
            then: (schema) => schema.max(new Date().getMonth()),
            otherwise: (schema) => schema.max(12)
        })
        .max(12, "Mes no válido"),
    yearOfBirth: Yup.number()
        .required(requiredField)
        .min(1920, "Ingrese un año mayor o igual a 1920")
        .max(2022, "Ingrese un año menor o igual a 2022"),
    email: Yup.string()
        .required(requiredField)
        .email("Formato no válido")
        .max(254, maxLength(254)),
    phone: Yup.string()
        .required(requiredField)
        .matches(new RegExp(/^\d+$/), "Sólo números")
        .min(7, "7 caracteres mínimo")
        .max(10, maxLength(10))
})

export const UserFormContainer = (props: { userService: UserService }) => {


    const user: User = {
        firstName: "",
        middleName: "",
        lastName: "",
        mothersLastName: "",
        dayOfBirth: 1,
        monthOfBirth: 1,
        yearOfBirth: 1990,
        email: "",
        phone: ""
    }

    const [isLoading, setIsLoading] = useState(false)
    const [storedUser, setStoredUser] = useState<UserDTO>()

    const sendRequest = async (requestBody: UserDTO) => {
        setIsLoading(true)
        try {
            setStoredUser(undefined)
            const response = await props.userService.saveUser(requestBody)
            setStoredUser(response)
            alert("Usuario registrado")
        } catch (error) {
            console.debug(error)
            alert("Error al internar establecer conexión con el servidor")
        } finally {
            setIsLoading(false)
        }
    }

    const formikRef = useRef<FormikProps<User>>(null)

    return (
        <div className="row">            
            <div className="col-xs-10 col-md-8 col-lg-6 mx-auto">
                <UserFormHeader />
                <Formik
                    initialValues={user}
                    validationSchema={userSchema}
                    onSubmit={(values, { setSubmitting }) => {

                        const formattedDate = new Date(values.yearOfBirth, values.monthOfBirth - 1, values.dayOfBirth).toLocaleDateString("es-MX", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                        })
                        const requestBody: UserDTO = {
                            firstName: values.firstName,
                            middleName: values.middleName,
                            lastName: values.lastName,
                            mothersLastName: values.mothersLastName,
                            email: values.email,
                            phoneNumber: values.phone,
                            dateOfBirth: formattedDate
                        }                        
                        sessionStorage.setItem("userData", JSON.stringify(requestBody))
                        sendRequest(requestBody)
                    }}
                    innerRef={formikRef}
                >
                    <Form>
                        {/**
                         * To make formik work, each field of the form should have the same name than the corresponding
                         * property in the initialValues object.
                         */}
                        <NameForm innerRef={formikRef} />
                        <DateOfBirthForm innerRef={formikRef} />
                        <ContactForm innerRef={formikRef} />
                        <div className="bg-light my-4 px-5 py-3 col-xs-12 col-sm-8 offset-md-4">
                            <p>Si tus datos son correctos, por favor continuemos</p>
                        </div>
                        <button type="submit" className="btn col-12 py-2 btn-pink" disabled={isLoading}>
                            {isLoading && "Cargando..."}
                            {!isLoading && "Iniciar"}
                        </button>
                    </Form>
                </Formik>
                {storedUser && (
                    <div className="bg-pink my-4 px-5 py-3">
                        <p>Fecha de nacimiento: {storedUser.dateOfBirth}  </p>
                        <p>Correo electrónico:  {storedUser.email} </p>
                        <p>Teléfono celular: {storedUser.phoneNumber} </p>
                        <p>Nombre: {storedUser.firstName} {storedUser.middleName} {storedUser.lastName} {storedUser.mothersLastName} </p>
                    </div>
                )}

            </div>
        </div>
    )
}
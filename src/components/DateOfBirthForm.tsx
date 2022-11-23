import { FormikProps } from "formik"
import React, { useEffect, useState } from "react"
import { months } from "../models/Months"
import { User } from "../models/User"
import { FormNumericField } from "./common/FormNumericField"
import { FormSelect } from "./common/FormSelect"
import { FormSection } from "./layout/FormSection"

type DateOfBirth = {
    day?: number,
    month?: string,
    year?: number
}

export const DateOfBirthForm = (props: {innerRef: React.RefObject<FormikProps<User>>}) => {

    const [dateOfBirth, setDateOfBirth] = useState<DateOfBirth>()

    /**
     * Gets the initial values from the Formik's config to populate the fields.
     * Check the initialValues property in the UserFormContainer component.
     */
    useEffect(() => {
        const currentRef = props.innerRef.current
        if(!currentRef) {
            return
        }
        const values = currentRef.values
        setDateOfBirth({
            day: values.dayOfBirth,
            month: months[values.monthOfBirth - 1].name,
            year: values.yearOfBirth
        })
    }, [props.innerRef.current])

    const setDayOfBirth = (setDay: string) => {
        const parsedResult = parseInt(setDay)
        if(isNaN(parsedResult)) {
            return
        }
        setDateOfBirth((prevState) => {
            return {
                ...prevState,
                day: parsedResult
            }            
        })
    }        

    const setYearOfBirth = (setYear: string) => {
        setDateOfBirth((prevState) => {
            const parsedResult = parseInt(setYear)
            if(isNaN(parsedResult)) {
                return
            }
            return {
                ...prevState,
                year: parsedResult
            }            
        })
    }

    const setMonthOfBirth = (setMonth: number) => {
        setDateOfBirth((prevState) => {
            return {
                ...prevState,
                month: months[setMonth-1].name
            }
        })
    }

    const determineMaxNumberOfDays = () => {
        if(!dateOfBirth || !dateOfBirth.month || !dateOfBirth.year) {
            return    
        }

        const currentMonth = months.find((month) => month.name === dateOfBirth.month)
        if(!currentMonth) {
            return
        }
        
        /**
         * getMonth() returns a number from 0 to 11. Since the currentMonth.value is in a range between 1 to 12, it is
         * necessary to perform a substraction to make the values compatible
         */        
        if(currentMonth.value === (new Date().getMonth() + 1)) {
            return new Date().getDate()
        }
        
        if(currentMonth.value === 1 || currentMonth.value === 3 || currentMonth.value === 5 || currentMonth.value === 7 || currentMonth.value === 8 || currentMonth.value === 10 || currentMonth.value === 12) {
            return 31
        } else if(currentMonth.value === 2) {
            if(dateOfBirth.year % 4 === 0) {
                return 29
            }
            return 28
        }

        return 30
    }

    const determineMaxNumberOfMonths = () => {
        if(!dateOfBirth || !dateOfBirth.year) {
            return months
        }

        if(dateOfBirth.year === 2022) {
            return [...months.slice(0, new Date().getMonth() + 1)]
        }

        return months

    }
    
    return (        
        <FormSection title="¿Cuál es tu fecha de nacimiento?" overview={(
            <p> {dateOfBirth?.day} {dateOfBirth?.month} {dateOfBirth?.year} </p>
        )}>
            <FormNumericField min={1} max={determineMaxNumberOfDays()} placeholder="Día" name="dayOfBirth"  onInput={setDayOfBirth} />
            <FormSelect name="monthOfBirth" options={determineMaxNumberOfMonths()} onSelect={setMonthOfBirth} />
            <FormNumericField min={1920} max={2022} name="yearOfBirth" placeholder="Año" onInput={setYearOfBirth} />
        </FormSection>
    )
}
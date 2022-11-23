import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { UserFormContainer } from "../components/UserFormContainer"
import { UserDTO } from "../data-transfer-objects/UserDTO"
import {UserService} from "../services/UserService"

class MockService implements UserService{
    saveUser<T>(user: UserDTO): Promise<T> {
        throw new Error("Method not implemented.")
    }

}

describe("Date of birth section should", () => {
    
    test("set 31 as max number of days in january, march, may, july, august, october and december", async () => {
        const mockService = new MockService()
        render(
            <UserFormContainer userService={mockService} />
        )
        
        // expect(screen.getByRole("option", {name: "Enero"}).selected).toBe

        userEvent.selectOptions(            
            screen.getByRole('combobox'),            
            screen.getByRole('option', { name: 'Enero' }),
        )
        expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Enero' }).selected).toBe(true)
        expect(screen.getByPlaceholderText<HTMLInputElement>("Día").max).toBe("31")

        userEvent.selectOptions(            
            screen.getByRole('combobox'),            
            screen.getByRole('option', { name: 'Marzo' }),
        )
        expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Marzo' }).selected).toBe(true)
        expect(screen.getByPlaceholderText<HTMLInputElement>("Día").max).toBe("31")

        userEvent.selectOptions(            
            screen.getByRole('combobox'),            
            screen.getByRole('option', { name: 'Mayo' }),
        )
        expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Mayo' }).selected).toBe(true)
        expect(screen.getByPlaceholderText<HTMLInputElement>("Día").max).toBe("31")

        userEvent.selectOptions(            
            screen.getByRole('combobox'),            
            screen.getByRole('option', { name: 'Julio' }),
        )
        expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Julio' }).selected).toBe(true)
        expect(screen.getByPlaceholderText<HTMLInputElement>("Día").max).toBe("31")

        userEvent.selectOptions(            
            screen.getByRole('combobox'),            
            screen.getByRole('option', { name: 'Agosto' }),
        )
        expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Agosto' }).selected).toBe(true)
        expect(screen.getByPlaceholderText<HTMLInputElement>("Día").max).toBe("31")

        userEvent.selectOptions(            
            screen.getByRole('combobox'),            
            screen.getByRole('option', { name: 'Octubre' }),
        )
        expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Octubre' }).selected).toBe(true)
        expect(screen.getByPlaceholderText<HTMLInputElement>("Día").max).toBe("31")

        userEvent.selectOptions(            
            screen.getByRole('combobox'),            
            screen.getByRole('option', { name: 'Diciembre' }),
        )
        expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Diciembre' }).selected).toBe(true)
        expect(screen.getByPlaceholderText<HTMLInputElement>("Día").max).toBe("31")                        
    })

    test("set 29 as max number of days in february if it is leap year", async () => {
        const mockService = new MockService()
        render(
            <UserFormContainer userService={mockService} />
        )                

        userEvent.type(screen.getByPlaceholderText("Año"), "1996")        

        userEvent.selectOptions(            
            screen.getByRole('combobox'),            
            screen.getByRole('option', { name: 'Febrero' }),
        )            
        expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Febrero' }).selected).toBe(true)
        expect(screen.getByPlaceholderText<HTMLInputElement>("Día").max).toBe("29")        
    })

    test("set 28 as max number of days in february if it is NOT leap year", async () => {
        const mockService = new MockService()
        render(
            <UserFormContainer userService={mockService} />
        )                

        userEvent.type(screen.getByPlaceholderText("Año"), "1995")        

        userEvent.selectOptions(            
            screen.getByRole('combobox'),            
            screen.getByRole('option', { name: 'Febrero' }),
        )
        expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Febrero' }).selected).toBe(true)
        expect(screen.getByPlaceholderText<HTMLInputElement>("Día").max).toBe("28")        
    })

    test("set current month as the last available month if year is 2022", async () => {
        const mockService = new MockService()
        render(
            <UserFormContainer userService={mockService} />
        )                

        userEvent.clear(screen.getByPlaceholderText("Año"))
        userEvent.type(screen.getByPlaceholderText("Año"), "2022")        
        await userEvent.click(screen.getByPlaceholderText("Nombre"))
        
        expect(screen.getAllByRole<HTMLSelectElement>('option').length).toBe(12)
        
    })

    test("set current day as the last available day if selected month is the current month and year is 2022", async () => {
        const mockService = new MockService()
        render(
            <UserFormContainer userService={mockService} />
        )                

        userEvent.clear(screen.getByPlaceholderText("Año"))
        userEvent.type(screen.getByPlaceholderText("Año"), "2022")
        userEvent.selectOptions(            
            screen.getByRole('combobox'),            
            screen.getByRole('option', { name: 'Noviembre' }),
        )                
        await waitFor(() => {
            expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Noviembre' }).selected).toBe(true)                
        })

        userEvent.clear(screen.getByPlaceholderText("Día"))
        userEvent.type(screen.getByPlaceholderText("Día"), "15")
        await waitFor(() => {
            expect(screen.getByPlaceholderText<HTMLInputElement>("Día").max).toBe(new Date().getDate().toString())
        })                                
    })        
})
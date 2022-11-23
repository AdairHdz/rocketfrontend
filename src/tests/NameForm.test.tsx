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

const requiredField = "Campo obligatorio"

describe("Name section should", () => {
    
    test("Ask for required fields", async () => {
        const mockService = new MockService()
        render(
            <UserFormContainer userService={mockService} />
        )
        
        await userEvent.click(screen.getByPlaceholderText("Nombre"))
        await userEvent.type(screen.getByPlaceholderText("Segundo nombre"), "Pedro")
        await userEvent.click(screen.getByPlaceholderText("Apellido paterno"))
        await userEvent.type(screen.getByPlaceholderText("Apellido materno"), "Ortiz")            
        
        await waitFor(() => {
            expect(screen.queryAllByText(requiredField)).toHaveLength(2)
        })
    })

    test("Warn exceeded length", async () => {
        const mockService = new MockService()
        render(
            <UserFormContainer userService={mockService} />
        )
        
        await userEvent.type(screen.getByPlaceholderText("Nombre"), "abcdeabcdeabcdeabcdeabcdeabcde") // 30 chars. No error.
        await userEvent.type(screen.getByPlaceholderText("Segundo nombre"), "abcdeabcdeabcdeabcdeabcdeabcdea") //31 chars. Should throw error
        await userEvent.type(screen.getByPlaceholderText("Apellido paterno"), "abcdeabcdeabcdeabcdeabcdeabcd") // 29 chars. Should not throw error
        await userEvent.type(screen.getByPlaceholderText("Apellido materno"), "abcdeabcdeabcdeabcdeabcdeabcdeab") // 32 chars. Should throw error
        await userEvent.click(screen.getByPlaceholderText("Nombre"))
        
        await waitFor(() => {
            expect(screen.queryAllByText("30 caracteres máximo")).toHaveLength(2)
        })
    })

    test("show error when trying to introduce symbols or numbers", async () => {
        const mockService = new MockService()
        render(
            <UserFormContainer userService={mockService} />
        )
        
        await userEvent.type(screen.getByPlaceholderText("Nombre"), "Ad4ir")
        await userEvent.type(screen.getByPlaceholderText("Segundo nombre"), "8enjamín")
        await userEvent.type(screen.getByPlaceholderText("Apellido paterno"), "Hern@ndez")
        await userEvent.type(screen.getByPlaceholderText("Apellido materno"), "0rt1z")
        await userEvent.click(screen.getByPlaceholderText("Nombre"))
        
        await waitFor(() => {
            expect(screen.queryAllByText("Sólo letras. No se permiten números ni caracteres especiales")).toHaveLength(4)
        })
    })
    
})
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

describe("Contact section should", () => {
    
    test("Ask for required fields", async () => {
        const mockService = new MockService()
        render(
            <UserFormContainer userService={mockService} />
        )
        
        await userEvent.click(screen.getByPlaceholderText("Correo electrónico"))
        await userEvent.type(screen.getByPlaceholderText("Segundo nombre"), "Pedro")
        await userEvent.click(screen.getByPlaceholderText("Teléfono celular"))
        await userEvent.type(screen.getByPlaceholderText("Apellido materno"), "Ortiz")            

        
        
        await waitFor(() => {
            expect(screen.queryAllByText(requiredField)).toHaveLength(2)
        })
    })

    test("Warn exceeded email length", async () => {
        const mockService = new MockService()
        render(
            <UserFormContainer userService={mockService} />
        )
        
        // 255 chars. Error
        await userEvent.type(screen.getByPlaceholderText("Correo electrónico"), "abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdea@cdea.comm")
        // await userEvent.type(screen.getByPlaceholderText("Teléfono celular"), "123456")
        await userEvent.click(screen.getByPlaceholderText("Nombre"))
        
        await waitFor(() => {
            expect(screen.queryAllByText("254 caracteres máximo")).toHaveLength(1)
        })
    })

    test("Warn invalid email", async () => {
        const mockService = new MockService()
        render(
            <UserFormContainer userService={mockService} />
        )
        
        
        await userEvent.type(screen.getByPlaceholderText("Correo electrónico"), "abcdeabcdeabcdeabcdeabdfn@.")
        // await userEvent.type(screen.getByPlaceholderText("Teléfono celular"), "123456")
        await userEvent.click(screen.getByPlaceholderText("Nombre"))
        
        await waitFor(() => {
            expect(screen.queryAllByText("Formato no válido")).toHaveLength(1)
        })
    })

    test("Warn phone number can't contain letters", async () => {
        const mockService = new MockService()
        render(
            <UserFormContainer userService={mockService} />
        )
                        
        await userEvent.type(screen.getByPlaceholderText("Teléfono celular"), "abcdef")
        await userEvent.click(screen.getByPlaceholderText("Nombre"))
        
        await waitFor(() => {
            expect(screen.queryAllByText("Sólo números")).toHaveLength(1)
        })
    })

    test("Warn phone number is too short", async () => {
        const mockService = new MockService()
        render(
            <UserFormContainer userService={mockService} />
        )
                        
        await userEvent.type(screen.getByPlaceholderText("Teléfono celular"), "123456")
        await userEvent.click(screen.getByPlaceholderText("Nombre"))
        
        await waitFor(() => {
            expect(screen.queryAllByText("7 caracteres mínimo")).toHaveLength(1)
        })
    })

    test("Warn phone number is too long", async () => {
        const mockService = new MockService()
        render(
            <UserFormContainer userService={mockService} />
        )
                        
        await userEvent.type(screen.getByPlaceholderText("Teléfono celular"), "12345678910")
        await userEvent.click(screen.getByPlaceholderText("Nombre"))
        
        await waitFor(() => {
            expect(screen.queryAllByText("10 caracteres máximo")).toHaveLength(1)
        })
    })
    
})
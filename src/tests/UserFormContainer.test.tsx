import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { UserFormContainer } from "../components/UserFormContainer"
import { UserDTO } from "../data-transfer-objects/UserDTO"
import {UserService} from "../services/UserService"

class MockService implements UserService{
    saveUser(user: UserDTO): Promise<UserDTO> {
        
        const promise = new Promise<UserDTO>((resolve, reject) => {
            resolve({
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                mothersLastName: user.mothersLastName,
                dateOfBirth: user.dateOfBirth,
                email: user.email,
                phoneNumber: user.phoneNumber
            })
        })   
        
        return promise
    }

}

describe('UserFormContainer', () => {

    render(<UserFormContainer userService={new MockService()} />)
    test("should display the server result", async () => {
        userEvent.type(screen.getByPlaceholderText("Nombre"), "Adair")
        userEvent.type(screen.getByPlaceholderText("Segundo nombre"), "Benjamín")
        userEvent.type(screen.getByPlaceholderText("Apellido paterno"), "Hernández")
        userEvent.type(screen.getByPlaceholderText("Apellido materno"), "Ortiz")

        userEvent.clear(screen.getByPlaceholderText("Día"))
        userEvent.type(screen.getByPlaceholderText("Día"), "20")

        userEvent.selectOptions(            
            screen.getByRole('combobox'),            
            screen.getByRole('option', { name: 'Agosto' }),
        )
        expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Agosto' }).selected).toBe(true)        
        
        userEvent.clear(screen.getByPlaceholderText("Año"))
        userEvent.type(screen.getByPlaceholderText("Año"), "2000")

        userEvent.type(screen.getByPlaceholderText("Correo electrónico"), "adairhz.lisuv@gmail.com")
        userEvent.type(screen.getByPlaceholderText("Teléfono celular"), "2290244283")

        userEvent.click(screen.getByText("Iniciar"))
        

        await waitFor(() => {
            expect(screen.getByText("Fecha de nacimiento: ", {exact: false})).toBeVisible()
        })
    })
})


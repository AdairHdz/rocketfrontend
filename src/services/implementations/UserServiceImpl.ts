import { UserDTO } from "../../data-transfer-objects/UserDTO";
import { UserService } from "../UserService";

export class UserServiceImpl implements UserService {
    async saveUser(user: UserDTO): Promise<UserDTO>{
        const response = await fetch("http://127.0.0.1:3000/users", {
            method: 'POST',            
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),            
        })                    
        if(!response.ok || response.status !== 201) {
            console.debug(await response.json())
            throw new Error("Ocurrió un error al procesar la solicitud")
        }
        
        const data: UserDTO = await response.json()
        return data
    }
}
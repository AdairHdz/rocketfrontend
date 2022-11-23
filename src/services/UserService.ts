import { UserDTO } from "../data-transfer-objects/UserDTO";

export interface UserService {
    saveUser(user: UserDTO): Promise<UserDTO>
}
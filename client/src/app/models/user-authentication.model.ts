import { User } from "@app/models/user.model";

export interface UserAuthentication{
    token: string,
    user: User
}
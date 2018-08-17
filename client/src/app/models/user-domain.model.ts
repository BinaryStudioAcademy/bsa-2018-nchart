import { Observable } from "rxjs";
import { ResponseScheme, Login, User, Register } from "@app/models";
import { UserAuthentication } from "@app/models/user-authentication.model";


export interface UserDomain{
    register(payload:{user:Register}):Observable<ResponseScheme<UserAuthentication>>
    login(payload:Login):Observable<ResponseScheme<UserAuthentication>>
    update(payload:User):Observable<ResponseScheme<User>>
    delete(payload:{id:string}):Observable<ResponseScheme<null>>
    get(payload:{id:string}):Observable<ResponseScheme<User>>
    getAll():Observable<ResponseScheme<User[]>>
    verifyToken(payload:{token:string}):Observable<ResponseScheme<boolean>>
}
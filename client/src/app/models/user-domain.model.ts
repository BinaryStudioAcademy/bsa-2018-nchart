import { Observable } from "rxjs";
import { ResponseScheme, Login, User, Register } from "@app/models";
import { UserAuthentication } from "@app/models/user-authentication.model";


export interface UserDomain{
    register(payload:{user:Register}):Observable<ResponseScheme<UserAuthentication>>
    login(payload:Login):Observable<ResponseScheme<UserAuthentication>>
    update(payload:User):Observable<ResponseScheme<User>>
    delete(payload:{userId:string}):Observable<ResponseScheme<null>>
    get(payload:{userId:string}):Observable<ResponseScheme<User>>
    getAll():Observable<ResponseScheme<User[]>>
    verifyToken(token:string):Observable<ResponseScheme<boolean>>
}
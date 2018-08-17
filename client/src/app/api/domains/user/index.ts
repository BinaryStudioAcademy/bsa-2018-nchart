import { UserDomain, ResponseScheme, Register, Login, User } from "@app/models";
import { Observable } from "rxjs";
import { UserAuthentication } from "@app/models/user-authentication.model";
import { Injectable } from "@angular/core";
import { HttpService } from "@app/api/http/http.service";
import { ServiceRequest } from "@app/models/serviceRequest.model";
import { RequestType } from "@app/models/requestType.model";

@Injectable()
export class UserDomainService implements UserDomain{
    private userPath='/user'
    constructor(private httpService: HttpService){}

    register(payload:{user:Register}):Observable<ResponseScheme<UserAuthentication>>{
        const s = this.httpService.makeRequest<ResponseScheme<UserAuthentication>>(
            new ServiceRequest(RequestType.POST, '/register',
            null,
            payload))

        s.subscribe(
            () => console.log('subscribe1'),
            () => console.log('subscribeError'),
           );
        
        s.subscribe(
            () => console.log('subscribe2'), 
            () => console.log('subscribeError2'), 
           )
        
        s.subscribe(
            () => console.log('subscribe3'), 
            () => console.log('subscribeError3'), 
            )

        return s;  
    }
    login(payload:Login):Observable<ResponseScheme<UserAuthentication>>{
        const s = this.httpService.makeRequest<ResponseScheme<UserAuthentication>>(
            new ServiceRequest(RequestType.POST, '/login',
            null,
            payload))

        return s;  
        
    }
    update(payload:User):Observable<ResponseScheme<User>>{
        const s = this.httpService.makeRequest<ResponseScheme<User>>(
            new ServiceRequest(RequestType.PUT, `/${payload.id}`,
            null,
            payload))

        return s;  
    }
    delete(payload:{id:string}):Observable<ResponseScheme<null>>{
        const s = this.httpService.makeRequest<ResponseScheme<null>>(
            new ServiceRequest(RequestType.DELETE, `/${payload.id}`,
            null,
            payload))

        return s; 
        
    }
    get(payload:{id:string}):Observable<ResponseScheme<User>>{
        throw new Error("Method not implemented.");
        
    }
    getAll():Observable<ResponseScheme<User[]>>{
        throw new Error("Method not implemented.");
        
    }
    verifyToken(payload:{token:string}):Observable<ResponseScheme<boolean>>{
        throw new Error("Method not implemented.");
        
    }
}
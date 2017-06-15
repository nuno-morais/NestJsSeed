
import { User  } from '../../Common/Models/Users/User';
import 'reflect-metadata';

const requestArgumentMetadataKey = Symbol("RequestArgument");
const userArgumentMetadataKey = Symbol("UserArgument");

export function RequestArgument(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requestArgumentMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requestArgumentMetadataKey, existingRequiredParameters, target, propertyKey);
}

export function UserArgument(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(userArgumentMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(userArgumentMetadataKey, existingRequiredParameters, target, propertyKey);
}

export function IncludeUser(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    let method = descriptor.value;
    descriptor.value = function () 
    {
        let requiredParameters: number[] = Reflect.getOwnMetadata(requestArgumentMetadataKey, target, propertyName);
        let requestIndex = (requiredParameters) ? requiredParameters[0] : null;
        let user: User = null;
        let userParameters: number[] = Reflect.getOwnMetadata(userArgumentMetadataKey, target, propertyName);
        if (userParameters && requestIndex >= 0)
        {
            let request = arguments[requestIndex];
            if (request != null && request.user != null)
            {
                user = new User();
                user.Id = request.user.identities[0].user_id;
                user.FirstName = request.user.displayName;
                user.Email = request.user.email;
                user.EmailVerified = request.user.email_verified;
                user.Picture = request.user.picture;
                let index: number = userParameters[0];
                [].splice.apply(arguments, [index,0].concat([<any>user]));
            }

        }

        return method.apply(this, arguments);
    }
}
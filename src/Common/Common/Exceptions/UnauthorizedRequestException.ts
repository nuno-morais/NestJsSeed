export class UnauthorizedRequestException extends Error
{
    constructor(message?: string)
    {
        super(message)
    }
}
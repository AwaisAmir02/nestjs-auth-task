import {IsEmail, IsNotEmpty, MinLength} from 'class-validator';

export class SignupDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    phoneNumber: string;

    @MinLength(6)
    password: string;
}
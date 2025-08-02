import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllUsers(): Promise<UserResponseDto[]> {
        const users = await this.prisma.user.findMany({
            select: {
            name: true,
            email: true,
            phoneNumber: true,
            createdAt: true,
            },
        });

        return users.map(user => ({
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            joinedAt: user.createdAt.toLocaleString('en-US', { timeZone: 'Asia/Karachi' }),
        }));
    }
}

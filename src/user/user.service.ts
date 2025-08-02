import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllUsers(): Promise<UserResponseDto[]> {
        const users = await this.prisma.user.findMany({
            select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            createdAt: true,
            },
        });

        return users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            joinedAt: user.createdAt.toLocaleString('en-US', { timeZone: 'Asia/Karachi' }),
        }));
    }

    async deleteUserById(id: string): Promise<{ message: string }> {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) throw new NotFoundException('User not found');

        await this.prisma.user.delete({ where: { id } });

        return { message: 'User deleted successfully' };
    }
}

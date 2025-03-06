import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import { PrismaClient } from "@prisma/client";
import * as argon2 from 'argon2'
import { UsersService } from "src/users/users.service";

const prisma = new PrismaClient({
    omit: {
        user: {
            hash: true
        }
    }
})

@Injectable({})
export class AuthService {
    constructor(private userService: UsersService){

    }
    async signin(dto: AuthDto) {
        try {
            // find user
            const {hash, user} = await this.userService.findOne(dto)
            // compare password
            const isPwMatched = await argon2.verify(hash, dto.password)
            if (!isPwMatched) throw new ForbiddenException('Wrong password')

            return user
        } catch (error) {
            throw new ForbiddenException(error)
        }

    }
    async signup(dto: AuthDto) {
        try {
            const hash = await argon2.hash(dto.password);
            const user = await prisma.user.create({
                data: {
                    email: dto.email,
                    firstName: dto.firstName,
                    hash
                }
            })
            return user
        } catch (error) {
            throw new ForbiddenException(error)
        }
    }
}

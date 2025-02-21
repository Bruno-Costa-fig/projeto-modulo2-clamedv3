import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class AuthController {
    private userRepository;

    constructor(){
        this.userRepository = AppDataSource.getRepository(User)
    }

    login = async (req: Request, res: Response) => {
        let userBody = req.body as {
            name: string;
            password: string;
        }

        const userEntity = await this.userRepository.findOneBy({name: userBody.name})
        
        if(!userEntity){
            res.status(400).json("Usuário não encontrado!")
            return
        }

        const valid = await bcrypt.compare(userBody.password, userEntity?.password)

        if(!valid){
            res.status(401).json("Usuário e/ou senha inválido(s)!")
            return
        }

        const payload = {
            userId: userEntity.id,
            name: userEntity.name,
            profile: userEntity.profile
        }

        const token = await jwt.sign(payload, process.env.JWT_SECRET ?? "")

        res.status(200).json({token: token, name: userEntity.name, profile: userEntity.profile})
    }
}

export default AuthController
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ProfileEnum, User } from "../entities/User";
import { Driver } from "../entities/Driver";
import { UserCreateRequest } from "../classes/UserCreateRequest";
import bcrypt from "bcrypt"
import { AuthRequest } from "../middlewares/auth";

class UserController {
  private userRepository;
  private driverRepository;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
    this.driverRepository = AppDataSource.getRepository(Driver)
  }

  create = async (req: Request, res: Response) => {
    let userBody = req.body as UserCreateRequest

    const passwordHash = await bcrypt.hash(userBody.password, 10)
    console.log(passwordHash)
    let user = await this.userRepository.save({
      name: userBody.name,
      password: passwordHash,
      profile: userBody.profile
    })

    if(userBody.profile == ProfileEnum.DRIVER){
      this.driverRepository.save({
        user_id: user.id,
        document: userBody.document
      })
    } else if(userBody.profile == ProfileEnum.BRANCH){
      // lógica para a branch
    }

    res.status(201).json(user)
  };

  getAll = async (req: AuthRequest, res: Response) => {
    res.status(200).json(req.userId)
  }
}

export default UserController;

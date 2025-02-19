import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ProfileEnum, User } from "../entities/User";
import { Driver } from "../entities/Driver";
import { UserCreateRequest } from "../classes/UserCreateRequest";

class UserController {
  private userRepository;
  private driverRepository;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
    this.driverRepository = AppDataSource.getRepository(Driver)
  }

  create = async (req: Request, res: Response) => {
    let userBody = req.body as UserCreateRequest

    let user = await this.userRepository.save({
      name: userBody.name,
      password: userBody.password, // tem que criptografar
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
  };


}

export default UserController;

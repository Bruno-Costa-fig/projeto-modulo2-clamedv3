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

  getAll = async (req: Request, res: Response) => {

    let profile = req.query.profile as string

    if(!!profile && profile != "ADMIN" && profile != "DRIVER" && profile != "BRANCH"){
      res.status(400).json("Valor inválido para a query 'profile'")
      return
    }

    let users = [] as User[]

    if(!!profile){
      users = await this.userRepository.find({where: {profile: profile as any as ProfileEnum}})
    } else {
      users = await this.userRepository.find()
    }
    res.status(200).json(users)
  }

  getById = async (req: Request, res: Response) => {

    const id = Number(req.params.id)

    const request = req as AuthRequest

    if(request.profile == "ADMIN" || (request.profile == "DRIVER" && Number(request.userId) == id)){
      let user = await this.userRepository.findOneBy({id: id})
      res.status(200).json(user)
      return
    }

    res.status(401).json("Você não tem permissão para acessar este recurso!")
  }
}

export default UserController;

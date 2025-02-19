import { ProfileEnum } from "../entities/User";

export class UserCreateRequest {
    name: string;
    profile: ProfileEnum;
    password: string;
    document: string;
}
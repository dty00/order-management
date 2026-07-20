import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User} from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ){}

    getAllUsers():Promise<User[]>{
        return this.userRepository.find();
    }

    async getUserById(id:string):Promise<User>{
        const user = await this.userRepository.findOneBy({id});

        if(!user){
            throw new NotFoundException(`User with Id ${id} was not found`);
        }
        return user;
    }


}

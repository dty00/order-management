import { Injectable, NotFoundException } from '@nestjs/common';


export interface User{
    id:string;
    firstName:string;
    lastName:string;
    password:string;
    dob?:string;
    adminNotes?:string;
}
@Injectable()
export class UserService {
    private readonly users: User[] = [
  {
    id: 'user-001',
    firstName: 'John',
    lastName: 'Smith',
    password: 'password123',
    dob: '1995-03-12',
    adminNotes: 'Regular customer',
  },
  {
    id: 'user-002',
    firstName: 'Emily',
    lastName: 'Brown',
    password: 'emily456',
    dob: '1998-07-25',
  },
  {
    id: 'user-003',
    firstName: 'Michael',
    lastName: 'Wilson',
    password: 'michael789',
    adminNotes: 'Requires account review',
  },
  {
    id: 'user-004',
    firstName: 'Sophia',
    lastName: 'Taylor',
    password: 'sophia321',
    dob: '2001-11-08',
  },
  {
    id: 'user-005',
    firstName: 'Daniel',
    lastName: 'Lee',
    password: 'daniel654',
    dob: '1992-05-19',
    adminNotes: 'Admin user',
  },
];

    getAllUsers():User[]{
        return this.users;
    }

    getUserById(id:string):User{
        const user = this.users.find((user)=>user.id === id);

        if(!user){
            throw new NotFoundException(`User with Id ${id} was not found`);
        }
        return user;
    }


}

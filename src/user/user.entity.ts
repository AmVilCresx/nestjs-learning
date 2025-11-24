import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'op_user'})
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'user_name'})
    username: string;

    @Column()
    password: string;

    @Column({name: 'first_letter'})
    firsrLetter: string;
}
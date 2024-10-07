import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 80 })
    name: string;

    @Column({ length: 80 })
    email: string;

    @Column({ length: 11 })
    cedula: string;

    @Column({ length: 11 })
    telefono: string;
    
    @Column()
    password: string;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role

}

import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class AccessToken { 
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	token: string;

	// @OneToOne(() => User, user => user.refreshToken)
	// user: User;
	@Column()
	// @OneToOne(() => User, user => user.accessToken)
	user_id: number;
}
import { AllowNull, CreatedAt, DataType } from "sequelize-typescript";
import BaseModel from "src/entities/base";
import { User } from "src/entities/user";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum TemplateStatus {
    ON_VALIDATION = 'validation',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

@Entity('templates')
export class Template extends BaseModel {
    @Column({
        nullable: false
    })
    template: string;

    @Column({
        nullable: false
    })
    status: string;

    @Column({
        type: "json",
        default: [],
    })
    parameters: string[];

    @ManyToOne(() => User, (user) => user.templates)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
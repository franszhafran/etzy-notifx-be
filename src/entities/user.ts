import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {CreatedAt, UpdatedAt, DeletedAt, AllowNull, Default, Model} from 'sequelize-typescript';
import BaseModel from "src/entities/base";
import { Template } from "src/entities/template";
import { APIKey } from "src/entities/api_key";

@Entity('users')
export class User extends BaseModel {
    @Column({
        nullable: false,
    })
    email: string;
    
    @Column({
        nullable: false,
    })
    name: string;

    @Column({
        nullable: false,
    })
    password: string;

    @Column({
        nullable: false,
    })
    phone: string;

    @OneToMany(() => Template, (template) => template.user)
    templates: Template[]

    @OneToOne(() => APIKey, (api) => api.user , { cascade: ['insert', 'update'] })
    api_key: APIKey;
}
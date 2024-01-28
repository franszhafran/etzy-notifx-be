import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {CreatedAt, UpdatedAt, DeletedAt, AllowNull, Default, Model} from 'sequelize-typescript';
import BaseModel from "src/entities/base";
import { Template } from "src/entities/template";
import { User } from "src/entities/user";

@Entity('api_keys')
export class APIKey extends BaseModel {
    @Column({
        nullable: false,
    })
    key: string;
    
    @Column({
        nullable: false,
    })
    secret: string;

    @Column({
        nullable: false,
        default: '',
    })
    callback_url: string;

    @OneToOne(() => User, (u) => u.api_key, { cascade: ['insert', 'update'] })
    @JoinColumn({ name: 'user_id' })
    user: User;

    build(key: string, secret: string, callback?: string) {
        const d =  new APIKey()
        d.key = key;
        d.secret = secret;
        d.callback_url = callback ? callback : '';
        return d
    }
}
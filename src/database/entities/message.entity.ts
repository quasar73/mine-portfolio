import { Entity, ObjectID, ObjectIdColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Message extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column({
        nullable: false,
    })
    message: string;

    @Column()
    discord: string;

    @Column()
    telegram: string;

    @Column()
    email: string;

    @Column({
        default: false,
    })
    seen: boolean;

    @Column()
    date: Date;
}

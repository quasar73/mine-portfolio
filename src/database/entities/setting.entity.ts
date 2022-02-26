import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Setting extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    key: string;

    @Column()
    value: string;
}

import { Entity, ObjectID, ObjectIdColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Building extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    featured: boolean;

    @Column('string', { array: true })
    images: string[];

    @Column()
    preview: string;

    @Column()
    minimizedPreview: string;
}

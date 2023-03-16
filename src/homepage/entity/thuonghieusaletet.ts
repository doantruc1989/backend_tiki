import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';


@Entity('thuonghieusaletet')
export class Thuonghieusaletet {

    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
    id: number;

    @Column('varchar', {  length: 75, nullable: true  })
    name: string;

    @Column('varchar')
    image: string;

    @Column('varchar')
    path: string;

    @Column('bigint', {default: () => "'0'"} )
    parentId: number;
}

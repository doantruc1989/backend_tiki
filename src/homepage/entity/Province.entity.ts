import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Province {

    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
    id: string;

    @Column('longtext')
    districts: string;

    // @Column( 'bigint', { name: 'cartId' } )
    // cartId: string;

    @Column('varchar')
    name: string;

    @Column('bigint')
    code: number;

    @Column('varchar')
    divisionType: string;

    @Column('varchar')
    codeName: string;

    @Column('bigint')
    phoneCode: number;

    // @Column( 'float', { name: 'price', precision: 12, default: () => "'0'" } )
    // price: number;

    // @Column( 'float', { name: 'discount', precision: 12, default: () => "'0'" } )
    // discount: number;

    // @Column( 'smallint', { name: 'quantity', default: () => "'0'" } )
    // quantity: number;

    // @Column( 'tinyint', { name: 'active', width: 1, default: () => "'0'" } )
    // active: boolean;

    // @Column( 'datetime', { name: 'createdAt' } )
    // createdAt: Date;

    // @Column( 'datetime', { name: 'updatedAt', nullable: true } )
    // updatedAt: Date | null;

    // @Column( 'text', { name: 'content', nullable: true } )
    // content: string | null;

    // @ManyToOne( () => Cart, ( cart ) => cart.cartItems, {
    // 	onDelete: 'RESTRICT',
    // 	onUpdate: 'RESTRICT',
    // } )
    // @JoinColumn( [ { name: 'cartId', referencedColumnName: 'id' } ] )
    // cart: Cart;

    // @ManyToOne( () => Product, ( product ) => product.cartItems, {
    // 	onDelete: 'RESTRICT',
    // 	onUpdate: 'RESTRICT',
    // } )
    // @JoinColumn( [ { name: 'productId', referencedColumnName: 'id' } ] )
    // product: Product;

}

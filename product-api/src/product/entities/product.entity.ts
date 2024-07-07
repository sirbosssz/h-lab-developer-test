import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ProductNames } from './product-name.entity'
import { ProductDescriptions } from './product-descriptions.entity'

@Entity({ name: 'products' })
export class Products {
  @Index()
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => ProductNames, (n) => n.product)
  names: ProductNames[]

  @OneToMany(() => ProductDescriptions, (n) => n.product)
  descriptions: ProductDescriptions[]

  @Column()
  price: number;
}

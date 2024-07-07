import { Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ProductNames } from './product-name.entity'

@Entity({ name: 'products' })
export class Products {
  @Index()
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => ProductNames, (n) => n.product)
  names: ProductNames[]
}

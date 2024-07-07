import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Languages } from './language.entity'
import { Products } from './product.entity'

@Entity({ name: 'product_descriptions' })
export class ProductNames {
  @Index()
  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @Column({ name: 'language_id' })
  languageId: string

  @ManyToOne(() => Languages)
  @JoinColumn({ name: 'language_id' })
  language

  @Index()
  @Column({ name: 'product_id' })
  productId: string

  @ManyToOne(() => Products)
  @JoinColumn({ name: 'product_id' })
  product

  @Column()
  name: string
}

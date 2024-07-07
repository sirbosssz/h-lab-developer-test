import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'languages' })
export class Languages {
  @Index()
  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @Column({ unique: true })
  code: string

  @Column()
  name: string
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'test' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  numberOfLikes: number
}

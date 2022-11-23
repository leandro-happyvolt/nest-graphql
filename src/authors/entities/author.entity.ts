import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../posts/post.entity';

@Entity()
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany((type) => Post, (post) => post.author)
  // Le ponemos nullable: true porque así no tenemos que pasarle los posts al momento de crear un author
  @Field((type) => [Post], { nullable: true })
  posts: Post[];
}

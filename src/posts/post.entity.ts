// Esta Entity no es solamente para detallar una interfaz común de TS para la app, sino que también nos va a servir para:
// - Detallar la estructura de la tabla en la DB
// - Para decirle a GraphQL que datos se puede consultar.
// - Podemos utilizar esta clase para específicar el tipo de dato que vamos a devolver en nuestros servicios
// - Incluso nos podría servir para hacer validaciones.

import { ObjectType, Int, Field } from '@nestjs/graphql';
import { Author } from '../authors/entities/author.entity';
// Ya no lo traemos de @nestjs/typeorm porque no estamos integrandolo sino que vamos a estar utilizando clases
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// Para decirle que esto es una entidad/tabla de la DB
@Entity()
// Para decirle que esto no es una clase común, sino que es una clase que se va a convertir en GraphQL, debemos usar el decorador @ObjectType()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  // Para decirle que esto es un campo de GraphQL y el tipo de dato que son, debemos usar el decorador @Field()
  // En este caso específicamos Int debido que en GraphQL también existen los flotantes
  @Field((type) => Int)
  id: number;
  @Column()
  // Y este por defecto lo infiere que es de tipo String
  @Field()
  title: string;
  // Si vamos a tener un campo opcional, también se lo debemos específicar a la tabla que se va a generar gracias al ORM
  @Column({ type: 'text', nullable: true })
  // Si vamos a tener un campo opcional, también se lo debemos específicar al campo de GraphQL
  @Field({ nullable: true })
  content?: string;

  @Column()
  @Field((type) => Int)
  authorId: number;

  // Como la relación es de uno a muchos desde author, acá tenemos que poner la relación inversa
  @ManyToOne((type) => Author, (author) => author.posts)
  @Field((type) => Author)
  author: Author;
}

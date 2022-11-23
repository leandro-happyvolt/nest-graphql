import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength, MaxLength, IsInt } from 'class-validator';

// Para que se convierta en un dato de GraphQL, auque también podemos verlo como para que se transforme en una interfaz de TypeScript así cuando el cliente
// haga CTRL + Space pueda ver los campos que necesita proveer para obtener los datos
@InputType()
export class CreatePostInput {
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(3, { message: 'Title is too short' })
  @MaxLength(20, { message: 'Title is too long' })
  // Para decirles que esto va a ser un campo de GraphQL
  @Field()
  title: string;

  @MaxLength(400)
  // Así como le específicamos en la clase que esto podría ser nulo, acá también para que el cliente también sepa
  @Field({ nullable: true })
  content: string;

  @IsInt()
  @Field()
  authorId: number;
}

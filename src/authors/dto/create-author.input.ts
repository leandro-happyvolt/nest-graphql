import { InputType, Field } from '@nestjs/graphql';
import { MaxLength, MinLength, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAuthorInput {
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(3, { message: 'Name is too short' })
  @MaxLength(20, { message: 'Name is too long' })
  @Field()
  name: string;
}

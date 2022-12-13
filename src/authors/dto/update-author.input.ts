import { CreateAuthorInput } from './create-author.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsInt } from 'class-validator';

@InputType()
export class UpdateAuthorInput extends PartialType(CreateAuthorInput) {
  @IsNotEmpty({ message: 'Author Id is required' })
  @IsInt()
  @Field((type) => Int)
  id: number;
}

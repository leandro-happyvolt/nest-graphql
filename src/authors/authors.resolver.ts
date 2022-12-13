import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Mutation(() => Author)
  createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ) {
    return this.authorsService.create(createAuthorInput);
  }

  // Este { name: } es que el cliente pueda acceder o hacer la query poniendo auhtors y que específique directamente los datos que necesita
  @Query((returns) => [Author], { name: 'authors' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Query((returns) => Author, { name: 'author' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOne(id);
  }

  @Mutation((returns) => Author)
  updateAuthor(
    @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
  ) {
    return this.authorsService.update(updateAuthorInput);
  }

  /* Si acá pongo que returns un Author
  En el servicio:
  return {
      id,
      name: 'author deleted',
  };
  En la query de GraphQL:
  mutation {
    removeAuthor(id: 18){
      id
      name
    }
  }
  En el return de la query:
  {
    "data": {
      "removeAuthor": {
        "id": 20,
        "name": "Author Delete"
      }
    }
  }
    Si acá pongo que returns un Int (tipo de @nestjs/graphql)
  En el servicio:
  return id;
  En la query de GraphQL:
  mutation {
    removeAuthor(id: 18)
  }
  En el return de la query:
  {
    "data": {
      "removeAuthor": 19
    }
  }
  */
  @Mutation((returns) => Int)
  removeAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.remove(id);
  }
}

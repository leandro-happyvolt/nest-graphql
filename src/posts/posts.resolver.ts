import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';
import { CreatePostInput } from './dto/create-post.input';
import { Post } from './post.entity';
import { PostsService } from './posts.service';

// Este (of) => Post es para específicarle que tipo de dato es todo Esto
@Resolver((of) => Post)
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  // Es importante decirle que tipo de GraphQL Request vamos a estar haciendo, ya que las query son para consultar datos del cliente y las
  // mutaciones son cuando el cliente nos quiere enviar datos o quiere eliminar algo o quiere actualizar algo
  // Este decorador viene de @nestjs/graphql y no de @nestjs/common o express
  // Fijate que la forma de decir que esto va a ser un arreglo de Post es distinta, si queremos indagar mas sobre esta sintaxys que utiliza el módulo de GraphQL
  // utiliza NestJS https://typegraphql.com/,
  @Query((returns) => [Post])
  posts() {
    return this.postsService.findAll();
  }

  @Query((returns) => Post)
  // @Args('id') este id GraphQL lo esta tomando como Float post(id: Float!): Post!, pero nosotros queremos que sea un Int, por lo que debemos especificarle que es un Int
  post(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findPostById(id);
  }

  // Ahora que agregamos el getAuthor en nuestro servicio de Posts que utiliza los métodos del servicio de Authors, ahora puedo detallar una sub consulta o
  // el inner join que hará para que busque el author cuando consulten un Post o multiples Posts
  @ResolveField((returns) => Author)
  // Este @Parent() hace referencia a la consulta principal que sería cuando haces posts {} ó post {} y nos da acceso al DTO que envía el cliente
  author(@Parent() post: Post): Promise<Author> {
    return this.postsService.getAuthor(post.authorId);
  }

  @Mutation((returns) => Post)
  // Este @Args() es como el req.body de una REST API
  createPost(@Args('postInput') post: CreatePostInput) {
    return this.postsService.createPost(post);
  }
}

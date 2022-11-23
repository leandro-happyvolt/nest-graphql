import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorsService } from 'src/authors/authors.service';
import { Author } from 'src/authors/entities/author.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { Post } from './post.entity';

/* Ahora este PostsService no es para que nosotros lo utilicemos directamente con la API, sino que las funciones que van a ser consultadas, van hacer uso de esta clase */
/* Es decir, si nosotros queremos ver esto en el FrontEnd, vamos a tener que crear un PostsResolver */
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private authorsService: AuthorsService,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async findPostById(id: number): Promise<Post> {
    return this.postsRepository.findOne({ where: { id } });
  }

  // Para que nosotros podamos definir que tipo de dato nos va a llegar desde el cliente, este sería un dato que se esta transfiriendo,
  // es decir, desde el cliente al backend, eso tiene un nombre específico en Nest.JS que es DTO (Data Transfer Object)
  createPost(post: CreatePostInput): Promise<Post> {
    const newPost = this.postsRepository.create(post);
    return this.postsRepository.save(newPost);
  }

  getAuthor(authorId: number): Promise<Author> {
    return this.authorsService.findOne(authorId);
  }
}

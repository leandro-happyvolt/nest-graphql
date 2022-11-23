import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  // Con esto le estoy diciendo que cuando yo llame desde estas clases, voy a poder integrar estas clases de TypeORM
  imports: [TypeOrmModule.forFeature([Post]), AuthorsModule],
  providers: [PostsService, PostsResolver],
})
export class PostsModule {}

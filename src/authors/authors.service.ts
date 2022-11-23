import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private authorsRepository: Repository<Author>,
  ) {}

  create(createAuthorInput: CreateAuthorInput): Promise<Author> {
    const newAuthor = this.authorsRepository.create(createAuthorInput);
    return this.authorsRepository.save(newAuthor);
  }

  findAll(): Promise<Author[]> {
    return this.authorsRepository.find();
  }

  findOne(id: number): Promise<Author> {
    return this.authorsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAuthorInput: UpdateAuthorInput) {
    const foundAuthor = await this.findOne(id);
    if (!foundAuthor) {
      // throw error nestjs
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    const updatedAuthor = Object.assign(foundAuthor, updateAuthorInput);

    return this.authorsRepository.save(updatedAuthor);
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}

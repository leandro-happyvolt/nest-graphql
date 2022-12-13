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

  // Luego el UpdateAuthorInput debería llamarse UpdateAuthorParams
  async update(updateAuthorInput: UpdateAuthorInput): Promise<Author> {
    const foundAuthor = await this.findOne(updateAuthorInput.id);
    if (!foundAuthor) {
      throw new HttpException('Author not found.', HttpStatus.NOT_FOUND);
    }
    const updatedAuthor = Object.assign(foundAuthor, updateAuthorInput);
    return this.authorsRepository.save(updatedAuthor);
  }

  async remove(id: number) {
    const deletedUser = await this.authorsRepository.delete({ id });

    if (deletedUser.affected === 0) {
      return new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }

    return id;
  }
}

import { DocumentBuilder } from '@nestjs/swagger';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserGenre } from './user_genre.entity';
import { Repository } from 'typeorm';
import { Genre } from 'src/genre/genre.entity';

@Injectable()
export class UserGenreService {
  constructor(
    @InjectRepository(UserGenre) private repo: Repository<UserGenre>,
    @InjectRepository(Genre) private genreRepo: Repository<Genre>,
  ) {}

  // user id 로 genre 가져오기.
  async getGenresByUserId(user_id: number) {
    const allUserGenres = await this.repo.find({ where: { user_id } });
    return allUserGenres;
    // const getCorrespondingGenres =
    // return
  }

  // user id 로 genre 추가하기.
  async create(user_id: number, genre_id: number) {
    const userGenre = this.repo.create({ user_id, genre_id });
    return await this.repo.save(userGenre);
  }

  async delete(user_id: number, genre_id: number) {
    return await this.repo.delete({ user_id, genre_id });
  }

  async deleteByUserId(user_id: number) {
    return await this.repo.delete({ user_id });
  }
}

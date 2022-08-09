import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder()
      .where("lower(title) LIKE :title", { title: `%${param.toLowerCase()}%` })
      .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`SELECT count(*) FROM games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder()
      .relation(Game, "users")
      .of(id)
      .loadMany();
      // Complete usando query builder
  }
}

import { BadRequestException, Body, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Withdrawal } from './withdrawal.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

export interface WithdrawalBody {
  user_id: number;
  amount: number;
  // approved: number;
}

@Injectable()
export class WithdrawalService {
  constructor(
    @InjectRepository(Withdrawal)
    private withdrawalRepo: Repository<Withdrawal>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private dataSource: DataSource,
  ) {}

  // Get
  async getByUserId(user_id: number) {
    const withdrawals = await this.withdrawalRepo.find({ where: { user_id } });
    return withdrawals;
  }

  async create(body: WithdrawalBody) {
    const { user_id, amount } = body;

    const withdrawal = this.withdrawalRepo.create({ user_id, amount });
    return await this.withdrawalRepo.save(withdrawal);
  }

  // PATCH
  async approve(id: number) {
    const withdrawal = await this.withdrawalRepo.findOneBy({ id });
    const user_id = withdrawal.user_id;
    const user = await this.userRepo.findOneBy({ id: user_id });

    withdrawal.approved = 1;
    user.collected_reward -= withdrawal.amount;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(User, user);
      await queryRunner.manager.save(Withdrawal, withdrawal);
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    }
  }
}

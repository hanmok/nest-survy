import { Module } from '@nestjs/common';
import { WithdrawalController } from './withdrawal.controller';
import { WithdrawalService } from './withdrawal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Withdrawal } from './withdrawal.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { GeoService } from 'src/geo/geo.service';
import { Geo } from 'src/geo/geo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Withdrawal, User, Geo])],
  controllers: [WithdrawalController],
  providers: [WithdrawalService, UserService, JwtService, GeoService],
})
export class WithdrawalModule {}

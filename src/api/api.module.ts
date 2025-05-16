import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports:[
    ScheduleModule.forRoot(),
  ],
  controllers: [ApiController, ],
  providers: [ApiService, PrismaService],
})
export class ApiModule {}

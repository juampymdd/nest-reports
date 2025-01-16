import { Module } from '@nestjs/common';
import { BasicRepotsService } from './basic-repots.service';
import { BasicRepotsController } from './basic-repots.controller';

@Module({
  controllers: [BasicRepotsController],
  providers: [BasicRepotsService],
})
export class BasicRepotsModule {}

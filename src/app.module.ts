import { Module } from '@nestjs/common';
import { BasicRepotsModule } from './basic-repots/basic-repots.module';

@Module({
  imports: [BasicRepotsModule],
})
export class AppModule {}

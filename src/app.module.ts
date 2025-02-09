import { Module } from '@nestjs/common';
import { BasicReportsModule } from './basic-reports/basic-reports.module';
import { PrinterModule } from './printer/printer.module';
import { StoreReportsModule } from './store-reports/store-reports.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [BasicReportsModule, PrinterModule, StoreReportsModule, PrismaModule],
  providers: [PrismaService],
})
export class AppModule {}

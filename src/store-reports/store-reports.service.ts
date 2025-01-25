import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { orderByIdReport } from 'src/reports/order-by-id.report';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
      }
    
      constructor(private readonly printerService: PrinterService) {
        super();
      }

    async getOrderById(orderId: string): Promise<PDFKit.PDFDocument> {
      
        
            const docDefinition = orderByIdReport();
        
            const doc = this.printerService.createPdf(docDefinition);
        
            return doc;
    }
}

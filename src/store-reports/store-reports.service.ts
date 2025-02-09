import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { orderByIdReport } from 'src/reports/order-by-id.report';

@Injectable()
export class StoreReportsService {
    
    
      constructor(
        private readonly printerService: PrinterService,
        private readonly prisma: PrismaService,
      ) {}

    async getOrderById(orderId: number): Promise<PDFKit.PDFDocument> {
      
            const order = await this.prisma.orders.findUnique({
                where: {
                    order_id: orderId
                },
                include: {
                    customers: true,
                    order_details: {
                        include: {
                            products: true
                        }
                    }
                }
            });
            console.log(JSON.stringify(order));
            if (!order) {
                throw new NotFoundException(`Order with id "${orderId}" not found`);
            }
            const docDefinition = orderByIdReport({
                data: order as any
            });
        
            const doc = this.printerService.createPdf(docDefinition);
        
            return doc;
    }
}

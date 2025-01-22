import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PrinterService } from 'src/printer/printer.service';
import { getEmploymentLetterByIdReport, getEmploymentLetterReport, getHelloWorldReport } from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  hello() {
    const docOptions = { name: 'John Doe' };
    const docDefinition = getHelloWorldReport(docOptions);

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async employmentLetter() {
    const docDefinition = getEmploymentLetterReport();

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async employmentLetterById(id:string) {

    const employee = await this.employees.findUnique({where: {id: Number(id)}});
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    console.log(employee);
    const docDefinition = getEmploymentLetterByIdReport({
      employerName: 'Juan Pablo Maddoni',
      employerPosition: 'CEO',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompanyName: 'Grow[CODE]',
    });
    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}

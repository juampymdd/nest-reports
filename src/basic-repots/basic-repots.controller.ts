import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BasicRepotsService } from './basic-repots.service';
import { CreateBasicRepotDto } from './dto/create-basic-repot.dto';
import { UpdateBasicRepotDto } from './dto/update-basic-repot.dto';

@Controller('basic-repots')
export class BasicRepotsController {
  constructor(private readonly basicRepotsService: BasicRepotsService) {}

  @Get()
  basicRepots() {
    return this.basicRepotsService.hello();
  }
}

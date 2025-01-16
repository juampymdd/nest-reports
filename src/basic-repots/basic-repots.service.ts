import { Injectable } from '@nestjs/common';
import { CreateBasicRepotDto } from './dto/create-basic-repot.dto';
import { UpdateBasicRepotDto } from './dto/update-basic-repot.dto';

@Injectable()
export class BasicRepotsService {
  async hello(): Promise<string> {
    return "Hello from basic reports";
  }
}

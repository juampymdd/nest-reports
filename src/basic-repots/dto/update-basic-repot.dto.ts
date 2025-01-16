import { PartialType } from '@nestjs/mapped-types';
import { CreateBasicRepotDto } from './create-basic-repot.dto';

export class UpdateBasicRepotDto extends PartialType(CreateBasicRepotDto) {}

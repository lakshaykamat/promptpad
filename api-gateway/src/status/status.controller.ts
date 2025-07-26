import { Controller, Get } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(private readonly statusServie: StatusService) {}

  @Get()
  getStatus() {
    return this.statusServie.check();
  }
}

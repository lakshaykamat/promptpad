import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusService {
  check(): { status: string } {
    return { status: 'ok' };
  }
}

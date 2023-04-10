import { Controller } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { JobService } from '../services';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  @Cron('*/10 * * * * *')
  async listenJob() {}
}

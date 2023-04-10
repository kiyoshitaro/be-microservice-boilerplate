import { Injectable } from '@nestjs/common';
import { Service } from '@microservice-platform/job-service/services/service';

@Injectable()
export class JobService extends Service {}

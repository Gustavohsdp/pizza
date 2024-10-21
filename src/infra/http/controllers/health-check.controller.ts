

import {
  Controller,
  Get
} from '@nestjs/common'

@Controller('/health')
export class HealthCheckController {

  @Get()
  async handle() {
    return {
      status: 200,
      message: 'Service is running',
    }
  }
}
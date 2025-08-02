import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';

@Controller('status')
export class StatusController {
    @Get()
    @Public()
    getStatus() {
        return {
            status: 'running',
            timestamp: new Date().toISOString(),
        };
    }
}

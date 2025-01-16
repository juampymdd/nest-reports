import { Injectable } from '@nestjs/common';

@Injectable()
export class BasicReportsService {

    async hello(): Promise<string> {
        return 'Hello from Basic Reports!';
    }

}

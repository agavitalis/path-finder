import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h3 style="text-align:center"> Hello World From Path-Finder Restaurants API:<code> /docs </code> to view API documentation <h3>';
  }
}

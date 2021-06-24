import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  public async create() {
    return 'create article from service';
  }
}

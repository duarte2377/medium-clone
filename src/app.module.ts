import { Module } from '@nestjs/common';
import { AppService } from '@app/app.service';
import { AppController } from '@app/app.controller';
import { TagModule } from '@app/tag/tag.module';

@Module({
  imports: [TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

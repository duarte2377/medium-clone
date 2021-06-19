import { Module } from '@nestjs/common';
import { AppService } from '@app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@app/app.controller';
import { TagModule } from '@app/tag/tag.module';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TagModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

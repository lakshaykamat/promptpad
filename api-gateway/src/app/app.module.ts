import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusModule } from '../status/status.module';

import { PromptModule } from 'src/prompt/prompt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    StatusModule,
    PromptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

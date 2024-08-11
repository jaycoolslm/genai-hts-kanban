import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/validation';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    /** Common Modules **/
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),

    /** App Modules **/
    AiModule,
  ],
})
export class AppModule {}

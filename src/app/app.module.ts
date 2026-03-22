import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from '../bot/bot.module';
import { FeatureFlagModule } from '../feature-flag/feature-flag.module';
import { PrismaModule } from '../prisma/prisma.module';
import { validateEnv } from './validators/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    BotModule,
    FeatureFlagModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

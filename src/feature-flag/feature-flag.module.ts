import { Global, Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module.js';
import { FeatureFlagController } from './feature-flag.controller.js';
import { FeatureFlagService } from './feature-flag.service.js';

@Global()
@Module({
  imports: [PrismaModule],
  controllers: [FeatureFlagController],
  providers: [FeatureFlagService],
  exports: [FeatureFlagService],
})
export class FeatureFlagModule {}

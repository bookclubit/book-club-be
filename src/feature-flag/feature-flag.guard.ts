import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { FEATURE_FLAG_KEY } from './feature-flag.constants.js';
import { FeatureFlagService } from './feature-flag.service.js';

@Injectable()
export class FeatureFlagGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly featureFlagService: FeatureFlagService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const flagName = this.reflector.getAllAndOverride<string | undefined>(
      FEATURE_FLAG_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!flagName) {
      return true;
    }

    const isEnabled = await this.featureFlagService.isEnabled(flagName);

    // Flag not found in DB — allow by default
    if (isEnabled === null) {
      return true;
    }

    // Flag found but disabled — block with 404
    if (!isEnabled) {
      throw new NotFoundException();
    }

    return true;
  }
}

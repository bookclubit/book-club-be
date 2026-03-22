import { SetMetadata } from '@nestjs/common';

import { FEATURE_FLAG_KEY } from './feature-flag.constants.js';

export const FeatureFlag = (flagName: string) =>
  SetMetadata(FEATURE_FLAG_KEY, flagName);

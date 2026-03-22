import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { FeatureFlagService } from './feature-flag.service.js';
import { CreateFeatureFlagSchema } from './dto/create-feature-flag.dto.js';
import { UpdateFeatureFlagSchema } from './dto/update-feature-flag.dto.js';

@Controller('admin/feature-flags')
export class FeatureFlagController {
  constructor(private readonly featureFlagService: FeatureFlagService) {}

  @Get()
  async findAll() {
    return this.featureFlagService.findAll();
  }

  @Get(':name')
  async findByName(@Param('name') name: string) {
    const flag = await this.featureFlagService.findByName(name);

    if (!flag) {
      throw new NotFoundException(`Feature flag "${name}" not found`);
    }

    return flag;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: unknown) {
    const result = CreateFeatureFlagSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(result.error.issues);
    }

    return this.featureFlagService.create(result.data);
  }

  @Patch(':name')
  async update(@Param('name') name: string, @Body() body: unknown) {
    const result = UpdateFeatureFlagSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(result.error.issues);
    }

    const flag = await this.featureFlagService.findByName(name);

    if (!flag) {
      throw new NotFoundException(`Feature flag "${name}" not found`);
    }

    return this.featureFlagService.update(name, result.data);
  }

  @Delete(':name')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('name') name: string) {
    const flag = await this.featureFlagService.findByName(name);

    if (!flag) {
      throw new NotFoundException(`Feature flag "${name}" not found`);
    }

    await this.featureFlagService.delete(name);
  }
}

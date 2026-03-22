import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

interface CacheEntry {
  value: boolean;
  cachedAt: number;
}

const CACHE_TTL_MS = 60_000;

@Injectable()
export class FeatureFlagService {
  private cache = new Map<string, CacheEntry>();

  constructor(private readonly prisma: PrismaService) {}

  async isEnabled(name: string): Promise<boolean | null> {
    const cached = this.cache.get(name);

    if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
      return cached.value;
    }

    const flag = await this.prisma.featureFlag.findUnique({ where: { name } });

    if (!flag) {
      return null;
    }

    this.cache.set(name, { value: flag.enabled, cachedAt: Date.now() });

    return flag.enabled;
  }

  async create(data: { name: string; enabled?: boolean; description?: string }) {
    this.invalidateCache();

    return this.prisma.featureFlag.create({ data });
  }

  async update(name: string, data: { enabled?: boolean; description?: string }) {
    this.invalidateCache();

    return this.prisma.featureFlag.update({ where: { name }, data });
  }

  async delete(name: string) {
    this.invalidateCache();

    return this.prisma.featureFlag.delete({ where: { name } });
  }

  async findByName(name: string) {
    return this.prisma.featureFlag.findUnique({ where: { name } });
  }

  async findAll() {
    return this.prisma.featureFlag.findMany();
  }

  private invalidateCache() {
    this.cache.clear();
  }
}

import { Module } from '@nestjs/common';
import {
  ModuleMetadata,
  Provider,
  DynamicModule,
} from '@nestjs/common/interfaces';
import {
  createNextServer,
  NextServerOptions,
} from './nextjs.provider';
import { NextController } from './nextjs.controller';

type ModuleType = NonNullable<ModuleMetadata['imports']>[0];

@Module({})
export class NextModule {
  static forRoot(
    nextServerOptions: NextServerOptions,
    cacheOptions?: {
      module: ModuleType;
      provider: Provider;
    }
  ): DynamicModule {
    if (process.env.NODE_ENV === 'test') {
      return {
        module: NextModule,
      };
    }

    const nextServer = createNextServer(nextServerOptions);
    const IMPORTS: ModuleType[] = [];
    const PROVIDERS: Provider[] = [nextServer];

    if (typeof cacheOptions !== 'undefined') {
      IMPORTS.push(cacheOptions.module);
      PROVIDERS.push(cacheOptions.provider);
    }

    return {
      module: NextModule,
      imports: IMPORTS,
      controllers: [NextController],
      providers: PROVIDERS,
      exports: [nextServer],
    };
  }
}

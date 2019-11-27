import Next from 'next';

import { FactoryProvider } from '@nestjs/common/interfaces';

export const NextServerToken = 'NextServerToken';
export type NextServer = ReturnType<typeof Next>;
export type NextServerOptions = Parameters<typeof Next>[0];

export const createNextServer = (
  nextServerOptions: NextServerOptions
): FactoryProvider<Promise<NextServer>> => ({
  provide: NextServerToken,
  useFactory: async () => {
    const nextServer = Next(nextServerOptions);
    await nextServer.prepare();
    return nextServer;
  },
});

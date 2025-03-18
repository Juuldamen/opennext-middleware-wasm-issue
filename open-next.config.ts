import type { OpenNextConfig } from '@opennextjs/aws/types/open-next.js';
import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import kvIncrementalCache from '@opennextjs/cloudflare/kv-cache';

const config: OpenNextConfig = {
  ...defineCloudflareConfig({
    incrementalCache: kvIncrementalCache,
  }),
};

export default config;

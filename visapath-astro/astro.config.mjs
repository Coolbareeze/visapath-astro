import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.visapath.pk',
  integrations: [tailwind(), react()],
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});

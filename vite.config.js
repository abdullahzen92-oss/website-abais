import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        sdit: resolve(__dirname, 'sdit.html'),
        smpSma: resolve(__dirname, 'smp-sma.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        calendar: resolve(__dirname, 'calendar.html'),
        admissions: resolve(__dirname, 'admissions.html'),
        contact: resolve(__dirname, 'contact.html'),
        admin: resolve(__dirname, 'admin280292.html'),
      },
    },
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true,
  },
});

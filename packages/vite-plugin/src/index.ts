import { PluginOption, WebSocket } from 'vite';
import buildBundle from './utils/buildBundle';
import { runApp } from './utils/runApp';
import AddressInfo = WebSocket.AddressInfo;
import { type ChildProcess, exec } from 'child_process';
import { join } from 'path';
import { readdirSync } from 'fs';
import { copyDir } from './utils/copyDir';

const DEFAULT_OUT_DIR = 'dist';
const DEFAULT_MAIN_ENTRY = './main/index.ts';
const DEFAULT_PRELOAD_ENTRY = './preload/index.ts';

type Options = {
  outDir?: string;
  preload?: {
    entry?: string;
    alias?: Record<string, string>;
  };
  main?: {
    entry?: string;
    alias?: Record<string, string>;
  };
  copyDirs?:string[];
};

export async function electron(options: Options = {}): Promise<PluginOption[]> {
  let app: ChildProcess | null = null;
  const outDirBase = join(process.cwd(), options.outDir ?? DEFAULT_OUT_DIR);

  const mainEntry = options.main?.entry ?? DEFAULT_MAIN_ENTRY;
  const preloadEntry = options.preload?.entry ?? DEFAULT_PRELOAD_ENTRY;

  const preloadBuildArgs = [preloadEntry, outDirBase, 'preload.js', (options.preload?.alias ?? {})] as const;
  const mainBuildArgs = [mainEntry, outDirBase, 'main.js',(options.main?.alias ?? {})] as const;

  return [
    {
      name: 'electron-buddy-renderer',
      config: (config, { command, isPreview }) => {
        const { root } = config;
        const entries = readdirSync(join(process.cwd(), root))
          .filter((file) => file.endsWith('.html'))
          .reduce(
            (acc, html) => ({
              ...acc,
              [html.split('.')[0]]: join(root, html)
            }),
            {}
          );

        return {
          base: '',
          build: {
            emptyOutDir: command === 'build',
            outDir: join(outDirBase, 'renderer'),
            minify: command === 'build' ? 'terser' : false,
            rollupOptions: {
              input: entries
            }
          },
          server: {
            open: isPreview
          },
        };
      }
    },
    {
      name: 'electron-buddy-main-preload',
      configureServer(server) {
        server.httpServer?.once('listening', async () => {
          const address = server.httpServer?.address() as AddressInfo;
          process.env['RENDERER_URL'] = `http://localhost:${address.port}`;

          await buildBundle(
            ...preloadBuildArgs,
            () => {
              server.ws.send({ type: 'full-reload' });
            },
            true
          );
          await buildBundle(
            ...mainBuildArgs,
            async () => {
              if (app) {
                if (process.platform === 'win32') {
                  exec(`taskkill /pid ${app.pid} /T /F`);
                } else {
                  app.kill();
                }
                console.log('🚀 restart electron app');
              }
              app = await runApp();
            },
            true
          );
        });
      },
      async buildStart() {
        await buildBundle(...preloadBuildArgs, () => {
          console.log('🚀 preload build end');
        });
        await buildBundle(...mainBuildArgs, () => {
          console.log('🚀 main build end');
        });
      }
    },
    {
      name: 'copy-files',
      apply: 'build',
      async buildStart() {
        if (options.copyDirs) {
          for (const dir of options.copyDirs) {
            copyDir(dir, join(outDirBase, dir));
          }
        }
      }
    }
  ];
}

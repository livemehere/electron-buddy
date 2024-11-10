import {PluginOption, ViteDevServer} from "vite";
import {join} from 'node:path';
import buildRollup from "./utils/buildRollup";
import {runApp} from "./utils/runApp";

type Options = {
    main:{
        root:string;
    },
    preload:{
        root:string;
    },
    renderer:{
        root:string;
    }
}

export function electron(options?:Options):PluginOption[]{
    let rendererServer:ViteDevServer;
    const rendererUrl = ' http://localhost:5173';
    process.env['RENDERER_URL'] = rendererUrl;

    return [
        {
            name:'electron-kit-renderer',
            config:()=>({
                root:'./renderer',
                base:'',
                build:{
                    emptyOutDir:false,
                    outDir: '../dist/renderer',
                },
            }),
        },
        {
            name:'electron-kit-main',
            async configureServer(server){
                console.log('configure server')
                await buildRollup(join(process.cwd(),'main/index.ts'), join(process.cwd(),'dist'),'main.js')
                await buildRollup(join(process.cwd(),'preload/index.ts'), join(process.cwd(),'dist'),'preload.js')
                await runApp();
            }
        },
    ]
}

import {PluginOption, ViteDevServer, WebSocket} from "vite";
import buildBundle from "./utils/buildBundle";
import {runApp} from "./utils/runApp";
import AddressInfo = WebSocket.AddressInfo;

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
    return [
        {
            name:'electron-kit-renderer',
            config:()=>({
                base:'',
                build:{
                    emptyOutDir:false,
                    outDir: './dist/renderer',
                    rollupOptions:{
                        input:{
                            app: './renderer/index.html'
                        }
                    }
                }
            }),
        },
        {
            name:'electron-kit-main',
            async configureServer(server){
                server.httpServer?.once('listening',()=>{
                    const address = server.httpServer?.address() as AddressInfo;
                    process.env['RENDERER_URL'] = `http://localhost:${address.port}/renderer/index.html`;

                })
                await buildBundle('./main/index.ts', './dist','main.js')
                await buildBundle('./preload/index.ts','./dist','preload.js')
                await runApp();
            }
        },
    ]
}

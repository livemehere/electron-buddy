import {PluginOption, WebSocket} from "vite";
import buildBundle from "./utils/buildBundle";
import {runApp} from "./utils/runApp";
import AddressInfo = WebSocket.AddressInfo;
import {ChildProcess} from "child_process";

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
    let app:ChildProcess|null = null;

    return [
        {
            name:'electron-kit-renderer',
            config:()=>({
                root:'./renderer',
                base:'',
                build:{
                    emptyOutDir:false,
                    outDir: '../dist/renderer',
                }
            }
        )},
        {
            name:'electron-kit-main',
            configureServer(server){
                server.httpServer?.once('listening',async ()=>{
                    const address = server.httpServer?.address() as AddressInfo;
                    process.env['RENDERER_URL'] = `http://localhost:${address.port}`;

                    await buildBundle('./preload/index.ts','./dist','preload.js',()=>{
                        server.ws.send({type:'full-reload'});
                    },true)
                    await buildBundle('./main/index.ts', './dist','main.js',async ()=>{
                        if(app){
                            app.kill();
                        }
                        app = await runApp();
                    },true)

                })
            }
        },
    ]
}

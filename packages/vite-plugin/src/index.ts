import {PluginOption, WebSocket} from "vite";
import buildBundle from "./utils/buildBundle";
import {runApp} from "./utils/runApp";
import AddressInfo = WebSocket.AddressInfo;
import {ChildProcess} from "child_process";

const PRELOAD_ARGS = ['./preload/index.ts','./dist','preload.js'] as const;
const MAIN_ARGS = ['./main/index.ts','./dist','main.js'] as const;

type Options = {
    main:{
        root:string;
    },
    preload:{
        root:string;
    },
    renderer:{
    }
}

export function electron(options?:Options):PluginOption[]{
    let app:ChildProcess|null = null;

    return [
        {
            name:'electron-buddy-renderer',
            config:(_,{command, isPreview})=>{
                return {
                    base:'',
                    build:{
                        emptyOutDir:command === 'build',
                        outDir: '../dist/renderer',
                    },
                    server:{
                        open:isPreview
                    }
                }
            }
        },
        {
            name:'electron-buddy-main-preload',
            configureServer(server){
                server.httpServer?.once('listening',async ()=>{
                    const address = server.httpServer?.address() as AddressInfo;
                    process.env['RENDERER_URL'] = `http://localhost:${address.port}`;

                    await buildBundle(...PRELOAD_ARGS,()=>{
                        server.ws.send({type:'full-reload'});
                    },true)
                    await buildBundle(...MAIN_ARGS,async ()=>{
                        if(app){
                            app.kill();
                            console.log('🚀 restart electron app');
                        }
                        app = await runApp();
                    },true)
                })
            },
            async buildStart(){
                await buildBundle(...PRELOAD_ARGS, ()=>{
                    console.log('🚀 preload build end');
                })
                await buildBundle(...MAIN_ARGS,()=> {
                    console.log('🚀 main build end');
                })
            }
        },
    ]
}

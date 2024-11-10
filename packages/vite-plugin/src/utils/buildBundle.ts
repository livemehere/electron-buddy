import {build} from "vite";

export default function buildBundle(input:string, outDir:string, filename:string,onBuildEnd:()=>void, watch = false){
    return build({
        configFile:false,
        build:{
            emptyOutDir:false,
            ssr:true,
            outDir,
            lib:{
                entry:input,
                formats:['cjs'],
            },
            rollupOptions:{
                output:{
                    entryFileNames:filename,
                }
            },
            watch: watch ? {} : null,
        },
        plugins:[
            {
                name:'on-build-end',
                buildEnd(){
                    onBuildEnd();
                }
            }
        ]
    })
}

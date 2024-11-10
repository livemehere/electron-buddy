import {build} from "vite";

export default function buildBundle(input:string, outDir:string, filename:string){
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
            }
        }
    })
}

import {join} from "node:path";
import {rollup} from "rollup";
import typescript from "@rollup/plugin-typescript";

export default async function buildRollup(entry:string, outDir:string, name:string){
    const bundle = await rollup({
        input:entry,
        plugins:[
            typescript()
        ]
    })
    await bundle.write({
        format:'cjs',
        file:join(outDir, name)
    })

    await bundle.close();
}

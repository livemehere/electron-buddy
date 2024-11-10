import {defineConfig} from "vite";
import {electron} from "@electron-buddy/vite-plugin";

export default defineConfig({
    plugins:[
        electron()
    ],
})


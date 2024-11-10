import {defineConfig} from "vite";
import {electron} from "@electron-kit/vite-plugin";

export default defineConfig({
    plugins:[
        electron()
    ],
})


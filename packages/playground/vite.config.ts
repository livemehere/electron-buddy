import {defineConfig} from "vite";
import {electron} from "vite-plugin-electron-kit";

export default defineConfig({
    plugins:[
        electron()
    ],
})


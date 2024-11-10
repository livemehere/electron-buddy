import {BrowserWindow} from "electron";
import {join} from "path";

type Option = {
    width:number,
    height:number
    path:string
}

export async function createWindow(option:Option){
    const {width, height, path} = option;
    const win = new BrowserWindow({
        width,
        height,
        webPreferences:{
            preload: join(__dirname, './preload.js'),
            sandbox: false
        }
    })

    if(process.env.NODE_ENV === 'development' && process.env['RENDERER_URL']){
        await win.loadURL(process.env['RENDERER_URL'])
    }else{
        await win.loadFile(join(__dirname, '../renderer/index.html'))
    }
    return win;

}

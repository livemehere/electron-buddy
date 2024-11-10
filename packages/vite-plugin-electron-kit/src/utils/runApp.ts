import { spawn } from 'child_process'

export async function runApp(){
    const p = spawn('electron',['.'],{stdio:'inherit'});
}

import { spawn } from 'child_process'

export async function runApp(){
    return spawn('electron',['.'],{stdio:'inherit'});
}

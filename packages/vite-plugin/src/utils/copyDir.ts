import fs from 'fs';


export function copyDir(from:string, to:string) {
   fs.cp(from, to ,{recursive: true}, (err) => {
    if (err) {
      throw err
    }
   })
}
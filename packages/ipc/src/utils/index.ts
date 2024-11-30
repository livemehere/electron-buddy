type ForeType<T> = { [k in keyof T as string extends k ? never : number extends k? never : symbol extends k ? never : k]: T[k] }

export type GenerateIpcInvokeMap<T> = Record<string, ForeType<{
  payload?:any;
  response?:any;
}>>
export type GenerateIpcOnMap<T> = Record<string, ForeType<{
  response:any;
}>>

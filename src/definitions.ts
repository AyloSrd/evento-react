export type Handlers<T> = {
    [Property in keyof T as Property extends `on${infer EventName}` ? Uncapitalize<EventName> : never]: T[Property] 
}
  
export type Payload<T, K extends keyof Handlers<T>> = 
    Handlers<T>[K] extends (undefined | (() => any)) ? 
        undefined
    : Handlers<T>[K] extends (undefined | ((e: CustomEvent<infer D>) => any)) ? 
        D
    :
        never
  
export type Evento<T> = <K extends keyof Handlers<T> & string>(
    eventName: K, 
    ...payload: Payload<T, K> extends undefined ? [undefined?] : [Payload<T, K>]
) => Promise<boolean>

export type HOCProps<T> = T & {
    evento: Evento<T>
}

import React from "react"

export type Handlers<T> = {
    [Property in keyof T as Property extends `on${infer EventName}` ? Uncapitalize<EventName> : never]: T[Property] 
}

export type Evento<T> = <K extends keyof Handlers<T> & string>(
    ...args: Handlers<T>[K] extends (undefined | ((evt?: CustomEvent<infer D> | undefined) => any)) ?
      [
        eventName: K,
        payload?: D | undefined,
      ]
    : Handlers<T>[K] extends (undefined | ((evt: CustomEvent<infer D>) => any)) ?
      [
        eventName: K,
        payload: D,
      ]
    : Handlers<T>[K] extends (undefined | ((evt?: undefined | React.SyntheticEvent & infer D) => any)) ?
      [
        eventName: K,
        payload?: D,
      ]
    : Handlers<T>[K] extends (undefined | ((evt: React.SyntheticEvent & infer D) => any)) ?
      [
        eventName: K,
        payload: D,
      ]
    :
      [
        eventName: K,
        payload?: string,
      ]
) => Promise<boolean>

export type HOCProps<T> = T & {
    evento: Evento<T>
}

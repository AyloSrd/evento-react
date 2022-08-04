import * as React from 'react'
import { Evento, Handlers, HOCProps } from './definitions'
import { create_custom_event, event_name_to_prop_name, is_synthetic_event_duck_typing } from './utils'

export function useCreateEvento<Props>(props: Props): Evento<Props> {
  return React.useCallback(function<N extends keyof Handlers<Props> & string>(
    ...args: Handlers<Props>[N] extends (undefined | ((evt?: CustomEvent<infer D> | undefined) => any)) ?
      [
        eventName: N,
        payload?: D | undefined,
      ]
    : Handlers<Props>[N] extends (undefined | ((evt: CustomEvent<infer D>) => any)) ?
      [
        eventName: N,
        payload: D,
      ]
    : Handlers<Props>[N] extends (undefined | ((evt?: undefined | React.SyntheticEvent & infer D) => any)) ?
      [
        eventName: N,
        payload?: D,
      ]
    : Handlers<Props>[N] extends (undefined | ((evt: React.SyntheticEvent & infer D) => any)) ?
      [
        eventName: N,
        payload: D,
      ]
    :
      [
        eventName: N,
        payload?: any,
      ]
  ): Promise<boolean> {
    const [eventName, payload] = args
    const propName = event_name_to_prop_name<Props>(eventName)
    const cb = props[propName!]
    if (typeof cb !== 'function') {
        return new Promise(resolve => resolve(false))
    }
    const eventPayload = payload && is_synthetic_event_duck_typing(payload) 
      ?  payload 
      : create_custom_event(eventName, payload)
    const res = cb(eventPayload)
    if (res instanceof Promise) {
        return res.then(() => true)
    }
    return new Promise(resolve => resolve(true))
  }, [props])
}

export function useExpCreateEvento<Props>(): Evento<Props> {
    // @ts-ignore: Unreachable code error
    const props = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner?.current?.pendingProps as Props
    return React.useCallback(function<N extends keyof Handlers<Props> & string>(
      ...args: Handlers<Props>[N] extends (undefined | ((evt?: CustomEvent<infer D> | undefined) => any)) ?
        [
          eventName: N,
          payload?: D | undefined,
        ]
      : Handlers<Props>[N] extends (undefined | ((evt: CustomEvent<infer D>) => any)) ?
        [
          eventName: N,
          payload: D,
        ]
      : Handlers<Props>[N] extends (undefined | ((evt?: undefined | React.SyntheticEvent & infer D) => any)) ?
        [
          eventName: N,
          payload?: D,
        ]
      : Handlers<Props>[N] extends (undefined | ((evt: React.SyntheticEvent & infer D) => any)) ?
        [
          eventName: N,
          payload: D,
        ]
      :
        [
          eventName: N,
          payload?: any,
        ]
  ): Promise<boolean> {
    const [eventName, payload] = args
    const propName = event_name_to_prop_name<Props>(eventName)
    const cb = props[propName!]
    if (typeof cb !== 'function') {
        return new Promise(resolve => resolve(false))
    }
    const eventPayload = payload && is_synthetic_event_duck_typing(payload) 
      ?  payload 
      : create_custom_event(eventName, payload)
    const res = cb(eventPayload)
    if (res instanceof Promise) {
        return res.then(() => true)
    }
    return new Promise(resolve => resolve(true))
  }, [props])
}

export function withEvento<P extends {}>(El: React.ComponentType<HOCProps<P>>) {
  return function (props: P) {
    const evento = useCreateEvento(props)
    const updatedProps: HOCProps<P> = { ...props, evento }
    return /*#__PURE__*/React.createElement(El, updatedProps)
  };
}

export type { Evento, HOCProps } from './definitions'

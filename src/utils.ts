function IE_custom_event<T>( evtType: string, evtDetail: T ) {
    const evt = document.createEvent('CustomEvent')
    evt.initCustomEvent( evtType, false, false, evtDetail );
    return evt;
}

function is_of_type<T>(variable: T, targetType: string): boolean {
    return typeof variable === targetType
}

export function create_custom_event<T>(evtType: string, evtDetail: T): CustomEvent<T> {
    const customEvt = 
        typeof window.CustomEvent === 'function'
            ? IE_custom_event(evtType, evtDetail)
            : new CustomEvent(evtType, { detail: evtDetail })
    return customEvt
}

export function event_name_to_prop_name<T>(eventName: string): (string & keyof T) {
    const propName = `${'on'}${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}` as string & keyof T
    return propName
}

export function is_synthetic_event_duck_typing(payload: any): boolean {
    return (
        is_of_type(payload.bubbles, 'boolean')
        && is_of_type(payload.cancelable, 'boolean')
        && is_of_type(payload.defaultPrevented, 'boolean')
        && is_of_type(payload.eventPhase, 'number')
        && is_of_type(payload.isTrusted, 'boolean')
        && is_of_type(payload.preventDefault, 'function')
        && is_of_type(payload.isDefaultPrevented, 'function')
        && is_of_type(payload.stopPropagation, 'function')
        && is_of_type(payload.isPropagationStopped, 'function')
        && is_of_type(payload.persist, 'function')
        && is_of_type(payload.timeStamp, 'number')
        && is_of_type(payload.type, 'string')
        && payload.currentTarget
        && payload.nativeEvent
        && payload.target
    )
}

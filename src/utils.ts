function IE_custom_event<T>( evtType: string, evtDetail: T ) {
    const evt = document.createEvent('CustomEvent')
    evt.initCustomEvent( evtType, false, false, evtDetail );
    return evt;
}

export function create_custom_event<T>(evtType: string, evtDetail: T): CustomEvent<T> {
    const customEvt = 
        typeof window.CustomEvent === "function"
            ? IE_custom_event(evtType, evtDetail)
            : new CustomEvent(evtType, { detail: evtDetail })
    return customEvt
}

export function event_name_to_prop_name<T>(eventName: string): (string & keyof T) {
    const propName = `${'on'}${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}` as string & keyof T
    return propName
}
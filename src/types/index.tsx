export interface State {
    readonly locos: LocoState
    readonly socket: WebSocketState
    readonly selectedLoco: SelectedLocoState
}

export interface LocoState {
    readonly locos: Loco[]
}

export interface Loco {
    readonly name: string
    readonly address: number
    readonly hash: string
    readonly functions: LocoFunction[]
}

export interface WebSocketState {
    readonly connected: boolean
    readonly message: string
}

export interface SelectedLocoState {
    loco: Loco | undefined
}

export interface LocoFunction {
    name: string
    enabled: boolean
    value: number
    baseValue: number
    icon: string | undefined
}

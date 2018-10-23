import { Action } from 'redux'
import { Loco } from 'types/index'

export interface LocoAction extends Action {
    name: string
    address: number
    loco: Loco | undefined
}

export interface WebSocketAction extends Action {
    connected: boolean
    message: string
}

export interface SelectedLocoAction extends Action {
    loco: Loco | undefined
    funcName: string |  undefined
}

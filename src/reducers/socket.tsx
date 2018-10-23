import {WebSocketState} from '../types/index'
import { WebSocketAction } from 'actions'

const initialState: WebSocketState = {
    connected: false,
    message: '',
}

export const socket = (state: WebSocketState = initialState, action: WebSocketAction): WebSocketState => {
    switch (action.type) {
        case 'SEND': {
            if (state.connected) {
                return ( {
                    ...state,
                    message: action.message,
                })
            }
            return state
        }
        case 'CONNECTED': {
            return ( {
                ...state,
                connected: action.connected,
            })
        }
        default:
        return state
    }
}

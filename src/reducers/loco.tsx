import {SelectedLocoState, LocoFunction} from '../types/index'
import { SelectedLocoAction } from 'actions'

const initialState: SelectedLocoState = {
    loco: undefined,
}

export const selectedLoco = (state: SelectedLocoState = initialState, action: SelectedLocoAction): SelectedLocoState => {
    switch (action.type) {
        case 'SET':
        return({
            loco: action.loco,
        })
        case 'TOGGLE':
        if (state.loco !== undefined) {
            const updatedFunctions = [ ...state.loco.functions]
            const func = updatedFunctions.find( (func: LocoFunction) => func.name === action.funcName)
            if (func !== undefined) {
                func.enabled = !func.enabled
            }
            return ({
                loco: {
                    ...state.loco,
                    functions: updatedFunctions,
                },
            })
        }
        return state
        default:
        return state
    }
}

import {LocoState, LocoFunction, Loco } from '../types/index'
import { LocoAction } from 'actions'

const initialState: LocoState = {
    locos: [],
}

const getInitialFunctions = (): LocoFunction[] => {
    const tmpFunctions: LocoFunction[] = []
    for (let index = 0; index < 5; index++) {
        let value = 16
        if (index !== 0) {
            value = Math.pow(2, index - 1)
        }
        tmpFunctions.push({
            name: 'F' + String(index),
            baseValue: 128,
            value,
            enabled: false,
            icon: undefined,
        })
    }
    for (let index = 0; index < 4; index++) {
        tmpFunctions.push({
            name: 'F' + String(index + 5),
            baseValue: 176,
            value: Math.pow(2, index),
            enabled: false,
            icon: undefined,
        })
    }
    tmpFunctions.push({
        name: 'F' + String(9),
        baseValue: 160,
        value: Math.pow(2, 0),
        enabled: false,
        icon: undefined,
    })
    return tmpFunctions
}
const hashCode = (str: string) => {
    // tslint:disable-next-line:no-bitwise
    return str.split('').reduce((prevHash, currVal) => (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0)
}
export const locos = (state: LocoState = initialState, action: LocoAction): LocoState => {
    switch (action.type) {
        case 'ADD_LOCO':
            return ({
              locos: [ ...state.locos, { name: action.name, address: action.address, functions: getInitialFunctions(), hash: String( hashCode(action.name + String(action.address))) }],
            })
        case 'REMOVE_LOCO':
          if (action.loco !== undefined) {
            return ({
              locos: state.locos.filter( (loco: Loco) => loco.hash !== action.loco.hash),
            })
          }
          return state
        case 'UPDATE_LOCO':
            if (action.loco !== undefined) {
              const updatedLocos = [ ...state.locos]
              const updateIndex = updatedLocos.findIndex( (loco: Loco) => loco.hash === action.loco.hash)
              updatedLocos[updateIndex] = action.loco
              return({
                locos: updatedLocos,
              })
            }
            return state
        default:
        return state
    }
}

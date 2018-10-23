import { combineReducers } from 'redux'
import { locos } from './locos'
import { socket } from './socket'
import { State } from '../types/index'
import { selectedLoco } from './loco'

export default combineReducers<State>({
    locos,
    socket,
    selectedLoco,
})


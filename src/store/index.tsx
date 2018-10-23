import {createStore} from 'redux'
import rootReducer from '../reducers'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'

const persistConfig = {
    key: 'version2',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)

export const persistor = persistStore(store)

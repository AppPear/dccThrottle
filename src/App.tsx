/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import Setup from './components/Setup'
import {Provider} from 'react-redux'
import {State} from './types/index'
import {store, persistor} from './store/index'
import { PersistGate } from 'redux-persist/integration/react'

class App extends Component<Readonly<State>> {
  public render() {
    return (
      <Provider
        store={ store }
      >
        <PersistGate
          persistor={persistor}
        >
          <Setup/>
        </PersistGate>
      </Provider>
    )
  }
}

export default App


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import AddLoco from '../containers/AddLoco'
import List from './List'
import {State} from '../types/index'
import {connect} from 'react-redux'
import { Dispatch } from 'redux'
import { WebSocketAction } from 'actions'

interface SetupState {
  webSocket: WebSocket | undefined
}

interface SetupProps {
  message: string
  connected: boolean
}

class Setup extends Component<SetupProps & DispatchProps, Readonly<SetupState>> {

  public readonly state: SetupState = {
    webSocket: undefined,
  }

  public componentDidMount() {
    this.tryToConnect()
  }

  public componentWillReceiveProps (next: SetupProps & DispatchProps) {
    if (next.message !== this.props.message) {
      if (this.state.webSocket !== undefined) {
        this.state.webSocket.send(next.message)
      }
    }
  }

  public render() {
    return (
     <View style={ styles.container}>
        <AddLoco/>
        <List/>
        { !this.props.connected &&
          <View style={ styles.connectionView }>
            <TouchableOpacity
              onPress={ () => {
                this.tryToConnect()
              }}
            >
              <Text>{'Disconnected'}</Text>
            </TouchableOpacity>
          </View>
        }
     </View>
    )
  }
  private tryToConnect = () => {
    const ws = new WebSocket('ws://192.168.2.113:44444', ['arduino'])
    ws.onopen = () => {
      this.props.setConnnection(true)
    }
    ws.onclose = () => {
      this.props.setConnnection(false)
    }
    this.setState({
      webSocket: ws,
    })
  }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
    },
    connectionView: {
      height: 40,
      backgroundColor: '#f45f42',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0.1,
    },
  })

const mapStateToProps = (state: State): SetupProps => {
  return {
    connected: state.socket.connected,
    message: state.socket.message,
  }
}

interface DispatchProps {
  setConnnection: (connected: boolean) => void
}
const mapDispatchToProps = (dispatch: Dispatch<WebSocketAction>): DispatchProps => {
  return{
    setConnnection: (connected: boolean) => dispatch({ type: 'CONNECTED', message: '', connected: connected}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Setup)


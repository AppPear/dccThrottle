/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native'
import Slider from 'react-native-slider'
import {State, Loco, LocoFunction} from '../types/index'
import {connect} from 'react-redux'
import { Dispatch } from 'redux'

enum direction {
  forward = 1,
  reverse = 0,
}

interface ControlState {
  name: string
  address: number
  trackPower: boolean
  direction: direction
  lights: boolean
  throttle: number
  sound: boolean
  status: string
}

interface ControlProps {
  back: () => void
}

class Control extends Component<StateProps & DispatchProps & ControlProps, Readonly<ControlState>> {

  public readonly state: ControlState = {
    name: this.props.loco !== undefined ? this.props.loco.name : 'no loco selected',
    address: this.props.loco !== undefined ? this.props.loco.address : 0,
    trackPower: false,
    direction: direction.forward,
    lights: false,
    sound: false,
    throttle: 0,
    status: 'not connected',
  }

  public componentDidUpdate() {
    console.log('update')
    this.setFunctions()
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.mainTitle}>{this.state.name}</Text>
        <View style={{ flex: 0.39}}>
        </View>
        <Text style={styles.subTitle}>{'Functions:'}</Text>
        <View style={ { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'} }>
          { this.props.loco !== undefined && this.props.loco.functions.map( (func: LocoFunction) => this.renderButton(func)) }
        </View>
        <Slider
          style={styles.slider }
          step={1}
          minimumValue={0}
          maximumValue={126}
          minimumTrackTintColor={'#ccf292'}
          maximumTrackTintColor={'#dde9cc'}
          thumbTintColor={'#ced9df'}
          thumbTouchSize={{width: 70, height: 70}}
          trackStyle={{height: 30, borderRadius: 10}}
          thumbStyle={ { borderWidth: 2, borderColor: '#bcd3df', width: 60, height: 60, borderRadius: 30 } }
          onValueChange={ async (val: any) => {
            this.sendMessage('<t 1 ' + String(this.state.address) + ' ' + String(val) + ' ' + String(this.state.direction) + ' >')
          }}
        />
        <Button
          title={ 'Back'}
          onPress={ () => {
            if (this.props.loco !== undefined) {
              this.props.updateLoco(this.props.loco)
            }
            this.props.back()
          }
          }
        />
      </View>
    )
  }

  private renderButton = (func: LocoFunction) => {
    let funcButtonStyle = styles.functionButton as any
    if (func.enabled) {
      funcButtonStyle = {
        ...funcButtonStyle,
        backgroundColor: '#fbaf5d',
      }
    }
    return(
      <TouchableOpacity
        onPress={ () => this.props.toggleFunction(func.name) }
      >
        <View style={ funcButtonStyle }>
          <Text style={ [styles.subTitle, { textAlign: 'center' }]}>{ func.name }</Text>
        </View>
      </TouchableOpacity>
    )
  }

  private setFunctions = () => {
    let base128 = 128
    let base176 = 176
    let base160 = 160
    if (this.props.loco !== undefined) {
      this.props.loco.functions.forEach(( func: LocoFunction) => {
        switch (func.baseValue) {
          case 128:
            if (func.enabled) {
              base128 += func.value
            }
            break
          case 176:
            if (func.enabled) {
              base176 += func.value
            }
            break
          case 160:
            if (func.enabled) {
              base160 += func.value
            }
            break
          default:

        }
      })
    }
    console.log(base128, base160, base176)
    this.sendMessage('<f ' + String(this.state.address) + ' ' + String(base128) + '>' + '\n' + '<f ' + String(this.state.address) + ' ' + String(base176) + '>' + '\n' + '<f ' + String(this.state.address) + ' ' + String(base160) + '>')
    // this.sendMessage('<f ' + String(this.state.address) + ' ' + String(base172) + '>')
    // this.sendMessage('<f ' + String(this.state.address) + ' ' + String(base160) + '>')
  }

  private sendMessage = (message: string) => {
    this.props.sendMessage(message, this.props.connected)
  }
}
interface StateProps {
    connected: boolean
    loco: Loco | undefined
}
const mapStateToProps = (state: State): StateProps => {
  return {
    loco: state.selectedLoco.loco,
    connected: state.socket.connected,
  }
}

interface DispatchProps {
    sendMessage: (message: string, connected: boolean) => void
    toggleFunction: (name: string) => void
    updateLoco: (loco: Loco) => void
}
const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => {
    return{
      sendMessage: (message: string, connected: boolean) => dispatch({ type: 'SEND', message, connected}),
      toggleFunction: (name: string) => dispatch({ type: 'TOGGLE', funcName: name}),
      updateLoco: (loco: Loco) => dispatch( { type: 'UPDATE_LOCO', name: '', address: '', loco }),
    }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
  },
  mainTitle: {
    fontSize: 42,
    textAlign: 'left',
    paddingTop: 36,
    fontFamily: 'Gill Sans',
    color: '#3d3d3d',
  },
  subTitle: {
    fontSize: 24,
    textAlign: 'left',
    fontFamily: 'Gill Sans',
    color: '#3d3d3d',
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
  },
  slider: {
    flex: 0.5,
    alignSelf: 'center',
    width: 300,
    height: 50,
  },
  functionButton: {
    width: 54,
    height: 54,
    backgroundColor: '#ebebeb',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Control)

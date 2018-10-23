
import React, {Component} from 'react'
import { View, StyleSheet, TextInput, Button } from 'react-native'
import {connect} from 'react-redux'
import { Dispatch } from 'redux'
import { LocoAction } from 'actions'

interface AddLocoState {
    name: string
    address: number
}

interface AddLocoProps {

}

class AddLoco extends Component<AddLocoProps & DispatchProps, Readonly<AddLocoState>> {

  public readonly state: AddLocoState = {
    name: '',
    address: 0,
  }

  public render() {
    return (
     <View style={ styles.container}>
        <TextInput
          onChangeText={ (name: string) => this.setState({name: name})}
          placeholder={ 'New loco name'}
          style={ [styles.textinput, { flex: 0.7} ]}
        />
         <TextInput
            onChangeText={ (address: string) => {
              this.setState({
                address: parseInt(address, 10),
              })
            }}
            placeholder={ 'Address'}
            style={ [styles.textinput, { flex: 0.3} ]}
            keyboardType={'numeric'}
        />
        <Button
            title={'Add'}
            onPress={ () => this.props.addLoco(this.state.name, this.state.address)}
        />
     </View>
    )
  }
}

interface DispatchProps {
  addLoco: (name: string, address: number) => void
}
const mapDispatchToProps = (dispatch: Dispatch<LocoAction>): DispatchProps => {
  return{
    addLoco: (name: string, address: number) => dispatch({ type: 'ADD_LOCO', name, address, loco: undefined}),
  }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    textinput: {
        backgroundColor: '#efefef',
        height: 50,
        padding: 5,
        borderWidth: 2,
        borderColor: '#fff',
    },
  })
export default connect(null, mapDispatchToProps)(AddLoco)


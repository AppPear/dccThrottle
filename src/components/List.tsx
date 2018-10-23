import React, {Component} from 'react'
import {StyleSheet, View, Text, FlatList, TouchableOpacity, Modal} from 'react-native'
import {State, Loco} from '../types/index'
import {connect} from 'react-redux'
import Control from './Control'
import { Dispatch } from 'redux'
import { SelectedLocoAction } from 'actions'

interface ListState {
  showControl: boolean
  selectedLoco: Loco | undefined
}

class List extends Component<StateProps & DispatchProps, Readonly<ListState>> {

  public readonly state: ListState = {
    showControl: false,
    selectedLoco: undefined,
  }

  public render() {
    return (
      <View style={styles.container}>
         <FlatList
          data={ this.props.locos }
          renderItem={ ( { item } ) => {
            const loco = item as Loco
            return(
              <TouchableOpacity
                onPress={ () => {
                  this.setState({
                    selectedLoco: loco,
                    showControl: true,
                  })
                }}
              >
                <View style={ styles.cell}>
                  <Text style={ styles.text}>{ loco.name}</Text>
                  <Text style={ styles.text}>{ loco.address}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
         />
         { this.state.selectedLoco !== undefined && this.presentControl(this.state.selectedLoco)}
      </View>
    )
  }

  private presentControl = (item: Loco) => {
    this.props.selectLoco(item)
    return(
      <Modal
        animationType='slide'
        transparent={false}
        visible={this.state.showControl}
        onRequestClose={ () => {
          this.setState({
            showControl: false,
          })
        }}
      >
        <Control
          back={ () => {
            this.setState({
              showControl: false,
            })
          }}
        />
      </Modal>
    )
  }
}
interface StateProps {
    locos: Loco[]
}
const mapStateToProps = (state: State): StateProps => {
    return {
        locos: state.locos.locos,
    }
}
interface DispatchProps {
  selectLoco: (loco: Loco) => void
}
const mapDispatchToProps = (dispatch: Dispatch<SelectedLocoAction>): DispatchProps => {
  return{
    selectLoco: (loco: Loco) => dispatch({ type: 'SET', loco: loco, funcName: undefined}),
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  cell: {
    height: 50,
    flexDirection: 'column',
    paddingLeft: 30,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: '#eaeaea',
    marginTop: 6,
    marginRight: 21,
    marginLeft: 21,
  },
  text: {
    fontSize: 18,
    marginEnd: 12,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(List)

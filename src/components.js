import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'

@observer("appState")
export class Value extends Component {
  render = () => {this.props.appState[]}
}

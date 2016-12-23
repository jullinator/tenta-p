import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import {Value, Action, List, Form} from './AppState'

@observer
class App extends Component {
  render() {
    return (
      <div>
        <Value name="currentText" />
        <List name="texts"
              renderItem ={(text, i)=>
                <Action name="select_text"
                        payload={{id:i}}
                        title={text.name} />
              }/>
        <Action name="add_text" title="Add New Text" />
        <Form model="text" fields={[
          {type:'string', name:'name'},
          {type:'text', name:'value'}
        ]} />
        <DevTools />
      </div>
    );
  }
};

export default App;

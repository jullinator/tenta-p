import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import { observable, extendObservable } from 'mobx';

class Text {
  constructor(data={}){
    extendObservable(this,{
      value:'no value',
      name: 'new text',
      index:0
    }, data)
  }
}

class AppState {
  @observable texts = []
  @observable currentText

  models = {
    text:{
      value:'',
      name:''
    }
  }

  dispatch = (action, payload) => (e)=> {
    action === 'add_text' ? this.texts.push(new Text()) : null
    action === 'select_text' ? this.currentText = this.texts[payload.id].value : null
    action === 'submit' ? (
      payload.model === 'text' ? this.texts.push( new Text(this.models.text) ) : null
    ) : null
    action === 'form_change' ? this.models[payload.model][payload.field.name] = e.target.value : null
  }
}
const appState = new AppState()
export default appState

export const List = observer(({name, renderItem})=>
  <div>
    {appState[name].map(renderItem)}
  </div>
)

export const Value = observer( props=>
  <span>{appState[props.name]}</span>
)

export const Form = ({model, fields}) =>
  <div>
    {fields.map((field,i)=>
        <div>
          <div>{field.name}</div>
          {field.type === 'text' ? <textarea onChange={appState.dispatch('form_change',{model, field})} /> : null}
          {field.type === 'string' ? <input onChange={appState.dispatch('form_change',{model, field})} /> : null}
        </div>
    )}
    <Action title="Submit" name="submit" payload={{model:model}} />
  </div>

export const Action = ({title, name, payload})=>
  <button onClick={appState.dispatch(name, payload)}> {title} </button>

Action.defaultProps= {
  payload:{}
}

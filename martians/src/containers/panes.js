import React from 'react'
import Component from '../components/Panes'
import { connect } from 'react-redux'

class Panes extends React.Component {
  render() {
    return (
      <Component { ...this.props } />
    )
  }
}

export default connect(
  state => ({
    mobile: state.get('mobile'),
    preview: state.get('preview'),
    posts: state.get('posts').toJS(),
    today: state.get('today')
  }),
  dispatch => ({ actions: {
    edit: id => dispatch({
      type: 'edit',
      payload: id
    }),
    preview: id => dispatch({
      type: 'preview',
      payload: id
    }),
    close: () => dispatch({
      type: 'close'
    }),
    add: (time, date) => dispatch({
      type: 'add',
      payload: {
        time,
        date
      }
    }),
    remove: id => dispatch({
      type: 'remove',
      payload: id
    })
  }})
)(Panes)

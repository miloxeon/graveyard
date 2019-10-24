import React from 'react'
import Component from '../components/Editor'
import Paranja from '../components/Paranja'
import Outsider from '../components/Outsider'
import { connect } from 'react-redux'

const validateText = text => text.trim().length > 0

const checkIfSubmitAllowed = post =>
  post.date && post.time &&
  validateText(post.text)

class Editor extends React.Component {
  render() {
    return (
      <Paranja
        mobile={ this.props.mobile }
        hidden={ this.props.hidden }
        inert={ this.props.hidden }
      >
        <Outsider
          callback={ this.props.actions.back }
          enabled={ !this.props.hidden }
        >
          <Component { ...this.props } />
        </Outsider>
      </Paranja>
    )
  }
}

const getPost = state => state.get('newPost').toJS()

export default connect(
  state => ({
    mobile: state.get('mobile'),
    post: getPost(state),
    hidden: !state.get('editorOpened'),
    submitAllowed: checkIfSubmitAllowed(getPost(state)),
    errors: state.get('errors').get('editor').toJS(),
    editing: state.get('preview') !== null
  }),
  dispatch => ({ actions: {
    back: () => dispatch({
      type: 'back'
    }),
    submit: () => dispatch({
      type: 'submit'
    }),
    commit: path => e => dispatch({
      type: 'commit',
      payload: {
        path: path,
        value: e.target.value
      }
    }),
    toggleTarget: target => dispatch({
      type: 'toggle_target',
      payload: target
    }),
    resolveError: key => dispatch({
      type: 'resolve_error',
      payload: key
    }),
    clear: () => dispatch({
      type: 'clear'
    })
  }})
)(Editor)

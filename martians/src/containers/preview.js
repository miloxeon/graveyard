import React from 'react'
import Component from '../components/Preview'
import Paranja from '../components/Paranja'
import Outsider from '../components/Outsider'
import { connect } from 'react-redux'
import { blankPost } from '../store/model.js'

class Preview extends React.Component {
  render () {
    return (
      <Paranja
        mobile={ this.props.mobile }
        hidden={ this.props.hidden }
        inert={ this.props.hidden }
      >
        <Outsider
          callback={ this.props.close }
          enabled={ !(this.props.hidden || this.props.editorOpened) }
        >
          <Component { ...this.props } />
        </Outsider>
      </Paranja>
    )
  }
}

const getPost = state => state
  .get('posts')
  .toJS()
  .filter(
    post => post.id === state.get('preview')
  )[0] || blankPost.toJS()


export default connect(
  state => ({
    mobile: state.get('mobile'),
    hidden: state.get('preview') === null,
    editorOpened: state.get('editorOpened'),
    post: getPost(state)
  }),
  dispatch => ({
    close: () => dispatch({
      type: 'close'
    }),
    edit: id => dispatch({
      type: 'edit',
      payload: id
    }),
    remove: id => dispatch({
      type: 'remove',
      payload: id
    })
  })
)(Preview)

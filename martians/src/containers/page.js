import React from 'react'
import Component from '../components/Page'
import { connect } from 'react-redux'

class Page extends React.Component {
  render() {
    return (
      <Component { ...this.props }>
        { this.props.children }
      </Component>
    )
  }
}

export default connect(
  state => ({
    mobile: state.get('mobile'),
    inert: state.get('editorOpened') || state.get('preview') !== null,
    asideOpened: state.get('asideOpened'),
    aside: "Aside content will be there"
  }),
  dispatch => ({
    toggleMenu: () => dispatch({
      type: 'toggle_menu'
    })
  })
)(Page)

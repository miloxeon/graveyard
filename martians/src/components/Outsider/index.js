import React from 'react'
import ClickOutside from 'react-click-outside'

export default props => props.enabled ? (
  <ClickOutside
    onClickOutside={ props.callback }
  >
    { props.children }
  </ClickOutside>
) : (
  <>
    { props.children }
  </>
)

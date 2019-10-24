import React from 'react'
import styles from './styles.module.css'
import Page from '../../containers/page.js'
import Panes from '../../containers/panes.js'
import Editor from '../../containers/editor.js'
import Preview from '../../containers/preview.js'

import avatar from './assets/avatar.png'

export default props => (
  <div className={ styles.root }>
    <Page>
      <Panes avatar={ avatar } />
    </Page>
    <Preview />
    <Editor avatar={ avatar } />
  </div>
)

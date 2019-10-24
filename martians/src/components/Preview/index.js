import React from 'react'
import Stats from './stats.js'
import Actions from './actions.js'
import { Icon } from '../Icon'

import styles from './styles.module.css'

const getRootStyles = mobile => [
  styles.root,
  mobile ? styles.mobile : ''
].join(' ')

class Preview extends React.Component {
  constructor (props) {
    super (props)
    this.createEscHandler = this.createEscHandler.bind(this)
  }

  createEscHandler (cb) {
    return e => {
      if (e.keyCode === 27) {
        cb()
      }
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.createEscHandler(this.props.close), false)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.createEscHandler(this.props.close), false)
  }

  render () {
    return (
      <div className={ getRootStyles(this.props.mobile) }>
        <header className={ styles.header }>
          <h2 className={ styles.heading }>
            Post preview
          </h2>
          <Actions
            published={ this.props.post.published }
            close={ this.props.close }
            edit={ () => this.props.edit(this.props.post.id) }
            remove={ () => this.props.remove(this.props.post.id) }
          />
        </header>
        <div className={ styles.main }>
          <div className={ styles.summary }>
            <aside className={ styles.meta }>
              { this.props.post.published ? 'Published at ' : 'Scheduled at ' }
              <span className={ styles.datetime }>
                { this.props.post.date + ', ' + this.props.post.time }
              </span>
            </aside>
            <div className={ styles.targets }>
              { (this.props.post.targets || []).map(target => (
                  <Icon brand={ target } key={ target } />
              )) }
            </div>
          </div>
          <p className={ styles.text }>
            { this.props.post.text }
          </p>
        </div>
        <Stats
          hidden={ !this.props.post.published }
          likes={ this.props.post.likes }
          comments={ this.props.post.comments }
          reposts={ this.props.post.reposts }
          views={ this.props.post.views }
        />
      </div>
    )
  }
}

export default Preview

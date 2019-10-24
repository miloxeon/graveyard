import React from 'react'
import Target from './target.js'
import Closer from './closer.js'
import { getRootStyles, getDraftButtonStyles, getInputStyles } from './deciders.js'
import styles from './styles.module.css'

import { ReactComponent as Clear } from './assets/clear.svg'

import {
  now,
  today,
  createSubmitHandler,
  createToggleTargetHandler,
  createDateChangeHandler,
  createTimeChangeHandler
} from './logic.js'

class Editor extends React.Component {
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
    document.addEventListener('keydown', this.createEscHandler(this.props.actions.back), false)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.createEscHandler(this.props.actions.back), false)
  }

  render () {
    return (
      <div className={ getRootStyles(this.props.mobile) }>
        <header className={ styles.header }>
          <h2 className={ styles.heading }>
            { this.props.editing ? 'Edit post' : 'New post' }
          </h2>
          <div className={ styles.pillbox }>
            <button
              type="reset"
              className={ styles.action }
              onClick={ this.props.actions.clear }
            >
              Clear
              <Clear className={ [styles.icon, styles.clear].join(' ') } />
            </button>
            <button
              type="button"
              className={ styles.action }
              onClick={ this.props.actions.back }
              title={ this.props.editing ? 'Back to preview' : 'Close editor' }
            >
              Close
              <Closer editing={ this.props.editing } />
            </button>
          </div>
        </header>
        <form
          className={ styles.main }
          onSubmit={ createSubmitHandler(this.props.actions.submit) }
        >
          <div className={ styles.when }>
            <div className={ styles.datetime }>
              <label className={ styles.label }>
                When to publish:
              </label>
              <input
                className={ getInputStyles(this.props.errors.datetime) }
                type="date"
                name="date"
                value={ this.props.post.date || today() }
                onChange={ createDateChangeHandler(this.props.actions) }
                aria-invalid={ this.props.errors.datetime }
                required={ true }
              />
              <span className={ styles.at }>
                at
              </span>
              <input
                className={ getInputStyles(this.props.errors.datetime) }
                type="time"
                name="time"
                value={ this.props.post.time || now() }
                onChange={ createTimeChangeHandler(this.props.actions) }
                aria-invalid={ this.props.errors.datetime }
                required={ true }
              />
              <small className={ styles.utc }>
                utc+03:00
              </small>
            </div>
            <div
              className={ [styles.errors, styles.when_footer].join(' ') }
              hidden={ !this.props.errors.datetime }
            >
              { this.props.errors.datetime }
            </div>
          </div>
          <div className={ styles.omnibox }>
            <div className={ styles.targets_wrapper }>
              <div className={ styles.targets }>
                <Target
                  avatar={ this.props.avatar }
                  targets={ this.props.post.targets }
                  handler={ createToggleTargetHandler(this.props.actions) }
                  name="facebook"
                />

                <Target
                  avatar={ this.props.avatar }
                  targets={ this.props.post.targets }
                  handler={ createToggleTargetHandler(this.props.actions) }
                  name="twitter"
                />

                <Target
                  avatar={ this.props.avatar }
                  targets={ this.props.post.targets }
                  handler={ createToggleTargetHandler(this.props.actions) }
                  name="googleplus"
                />

                <Target
                  avatar={ this.props.avatar }
                  targets={ this.props.post.targets }
                  handler={ createToggleTargetHandler(this.props.actions) }
                  name="instagram"
                />

                <Target
                  avatar={ this.props.avatar }
                  targets={ this.props.post.targets }
                  handler={ createToggleTargetHandler(this.props.actions) }
                  name="youtube"
                />
              </div>
              <div
                className={ [styles.errors, styles.targets_footer].join(' ') }
                hidden={ !this.props.errors.targets }
              >
                { this.props.errors.targets }
              </div>
            </div>
            <textarea
              className={ styles.textarea }
              name="text"
              placeholder="Text and links"
              value={ this.props.post.text }
              onChange={ this.props.actions.commit('text') }
              required={ true }
            ></textarea>
          </div>
          <footer className={ styles.footer }>
            <button
              type="button"
              className={ getDraftButtonStyles(this.props.editing) }
            >
              Save as draft
            </button>
            <button
              type="submit"
              className={ styles.button }
              disabled={ !this.props.submitAllowed }
            >
              { this.props.editing ? 'Save changes' : 'Schedule post' }
            </button>
          </footer>
        </form>
      </div>
    )
  }
}

export default Editor

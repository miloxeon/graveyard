import React, { Component } from 'react'
import styles from './styles.module.css'
import Dropdown from '../Dropdown'
import List from '../List'

class CustomTrigger extends Component {
  render () {
    return (
      <input
        type="checkbox"
        checked={ this.props.isOpen }
        onChange={ this.props.toggle }
        ref={ this.props.innerRef }
      />
    )
  }
}

export default props => (
  <main className={ styles.root }>
    <h1>Dropdown for nebenan.de</h1>
    <h2 className="spaced-v">Basic dropdown with text</h2>
    <code>
      { "<Dropdown trigger={ 'Menu' }> ... </Dropdown>" }
    </code>
    <div className="spaced">
      <Dropdown trigger="Menu">
        Enim officia ingeniis, eiusmod nisi possumus appellat. Admodum fore cernantur
        officia o aut esse velit quid voluptate, ita nulla admodum, si minim do aute hic
        o appellat despicationes ab constias eram excepteur, elit eu si enim quamquam an
        singulis an sint cupidatat. Possumus fugiat ingeniis expetendis, ad nisi illum
        culpa consequat si incididunt de veniam et hic aliqua eu fore ubi labore eu
        offendit ita laboris elit illum et esse ubi aut sed noster nostrud, quibusdam
        esse duis nam quae. Ad ex elit irure.
      </Dropdown>
    </div>

    <h2 className="spaced-v">Dropdown inside flexbox with width 70%</h2>
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      width: '70%',
      backgroundColor: 'lightgrey'
    }}>
      <Dropdown trigger="Menu">
        Dropdown works just fine being inside pretty much anything. It will never be off-screen.
      </Dropdown>
    </div>

    <h2 className="spaced-v">Options</h2>
    <code>
      {"options={["}<br />
      &nbsp;&nbsp;{"'hello',"}<br />
      &nbsp;&nbsp;{"'world',"}<br />
      &nbsp;&nbsp;{"'reallylonglistitemreallylonglistitemreallylonglistitemreallylonglistitem',"}<br />
      &nbsp;&nbsp;{"<a href='https://nebenan.de'>A link to nebenan.de</a>,"}<br />
      &nbsp;&nbsp;{"<span>Not a link</span>"}<br />
      {"]}"}
    </code>
    <Dropdown>
      {/* Works even without trigger */}
      <List
        onChange={ console.log }
        options={[
          'hello',
          'world',
          'reallylonglistitemreallylonglistitemreallylonglistitemreallylonglistitem',
          <a href="https://nebenan.de">A link to nebenan.de</a>,
          <span>Not a link</span>
        ]}
      />
    </Dropdown>

    <h2 className="spaced-v">Custom trigger</h2>
    <Dropdown trigger={ CustomTrigger }>
      The custom trigger component is expected to receive this:
      <ul>
        <li>isOpen – Boolean</li>
        <li>toggle – Function. Will open the dropdown. Tie this to onChange, onClick or something like that.</li>
        <li>innerRef – a ref for the element to receive focus. Should be passed to an interactive element inside.</li>
      </ul>
      The trigger prop should be either a string or a React component.
    </Dropdown>

    <h2 className="spaced-v">Empty dropdown</h2>
    <Dropdown trigger={ "Empty" }>
      {/* Empty children test! */}
    </Dropdown>

    <div style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
      <Dropdown trigger={ "Menu" }>
        Yes, this is a fixed dropdown. It works!
      </Dropdown>
    </div>
  </main>
)

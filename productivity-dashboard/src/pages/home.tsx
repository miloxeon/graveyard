import React from 'react'
import { Link } from 'react-router-dom'

export default React.memo(() => (
  <div className='transition-item home'>
    Home page
    <ul>
      <li>
        <Link to='/tomato'>Tomato timer</Link>
      </li>
    </ul>
  </div>
))

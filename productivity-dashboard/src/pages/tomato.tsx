import React from 'react'
import { Link } from 'react-router-dom'

export default React.memo(() => (
  <div className='transition-item miniapp'>
    <Link to='/'>&lt; back</Link>
    Tomato timer
  </div>
))

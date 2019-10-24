import React from 'react'
import styles from './styles.module.css'
import icons from './icons.js'

const iconStyles = {
  'facebook': styles.facebook,
  'googleplus': styles.googleplus,
  'instagram': styles.instagram,
  'twitter': styles.twitter,
  'youtube': styles.youtube
}

const InlineIcon = props => {
  const BrandIcon = icons[props.brand]
  return <BrandIcon { ...props } />
}

export const Icon = props => (
  <span
    className={ [
      styles.icon,
      iconStyles[props.brand],
      props.colorful ? styles.icon_colorful : '',
      props.small ? styles.small : ''
    ].join(' ') }
  >
    <InlineIcon
      className={ [
        styles.inline_icon,
        props.colorful ? styles.inline_icon_colorful : ''
      ].join(' ') }
      { ...props }
    />
  </span>
)

export const Avatar = props => (
  <span className={ styles.avatar }>
    <img
      width="20"
      height="20"
      src={ props.avatar }
      alt="Avatar"
    />
    <Icon
      colorful="true"
      small="true"
      { ...props }
    />
  </span>
)

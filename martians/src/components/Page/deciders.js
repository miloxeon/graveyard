import styles from './styles.module.css'

export const getRootStyles = (mobile, inert) => [
  styles.root,
  mobile ? styles.mobile : '',
  inert ? styles.inert : ''
].join(' ')

export const getMainStyles = asideOpened => [
  styles.main,
  asideOpened ? styles.greyed : ''
].join(' ')

export const getAsideStyles = (mobile, asideOpened) => [
  styles.aside,
  (mobile && !asideOpened) ? styles.shifted : ''
].join(' ')

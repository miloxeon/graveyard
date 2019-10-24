import styles from './styles.module.css'

export const getRootStyles = mobile => [
  styles.root,
  mobile ? styles.mobile : ''
].join(' ')

export const getDraftButtonStyles = editing => [
  styles.button,
  editing ? styles.invisible : ''
].join(' ')

export const getInputStyles = error => [
  styles.input,
  error ? styles.error : ''
].join(' ')

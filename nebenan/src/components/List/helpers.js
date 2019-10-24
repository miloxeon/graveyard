export const wrapHandler = (handler, content) => e => {
  e.stopPropagation()
  e.preventDefault()
  const cb = handler || function () {}
  cb(content)
}

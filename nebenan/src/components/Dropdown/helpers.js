export const getRect = ref => ref.current.getBoundingClientRect()

export const calculateDimensions = () => ({
  width: window.innerWidth,
  height: window.innerHeight
})

export const activateDropdown = (oldState, verticalPosition, horizontalPosition) => ({
  ...oldState,
  dropdownStyle: {
    ...oldState.dropdownStyle,
    ...verticalPosition,
    ...horizontalPosition
  },
  active: !oldState.active
})

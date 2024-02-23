export const barOpenOptions: [Keyframe[], KeyframeAnimationOptions] = [
  [{ width: window.innerWidth > 400 ? '400px' : '100vw' }],
  {
    duration: 300,
    fill: 'forwards',
  },
]

export const barCloseOptions: [Keyframe[], KeyframeAnimationOptions] = [
  [{ width: window.innerWidth > 400 ? '80px' : '0px' }],
  {
    duration: 200,
    fill: 'forwards',
  },
]

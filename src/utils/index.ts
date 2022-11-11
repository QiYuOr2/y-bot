export * from './config'
export * from './typeOf'

export const noop = () => {}

export const secondToDate = (time: number) => {
  let h = Math.floor(time / 3600)
  let m = Math.floor((time / 60) % 60)
  let s = Math.floor(time % 60)
  return h + '小时' + m + '分' + s + '秒'
}

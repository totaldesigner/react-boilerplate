import { getWindowHeight, getWindowWidth } from '../screen'

describe(`screen`, () => {
  it(`should not be 0 - height`, () => {
    const height = getWindowHeight()
    expect(height).not.toEqual(0)
  })

  it(`should not be 0 - weight`, () => {
    const width = getWindowWidth()
    expect(width).not.toEqual(0)
  })

  it(`should be 0 - height`, () => {
    Object.defineProperty(window, 'innerHeight', {
      value: null,
      writable: true,
    })
    const height = getWindowHeight()
    expect(height).toEqual(0)
  })

  it(`should be 0 - weight`, () => {
    Object.defineProperty(window, 'innerWidth', {
      value: null,
      writable: true,
    })
    const width = getWindowWidth()
    expect(width).toEqual(0)
  })
})

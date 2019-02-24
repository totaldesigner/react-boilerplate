import debug from '../debug'

describe(`debug`, () => {
  it(`should be called`, () => {
    const consoleSpy = jest.fn((log: string) => null)
    debug.log = consoleSpy
    debug(`test`)
    expect(consoleSpy).toHaveBeenCalled()
  })
})

import { isvalidUsername as validUsername, validateURL } from '@/common/utils/validate.js'

describe('Utils:validate', () => {
  it('validUsername', () => {
    expect(validUsername('admin')).toBe(true)
    expect(validUsername('editor')).toBe(true)
    expect(validUsername('xxxx')).toBe(false)
  })
  it('isvalidCheck', () => {
    expect(validateURL('https://github.com/PanJiaChen/vue-element-admin')).toBe(true)
    expect(validateURL('/dashboard')).toBe(false)
  })
})

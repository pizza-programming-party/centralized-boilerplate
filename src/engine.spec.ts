
import {
  prepare
} from './engine'

describe('hello', () => {
  it('test', () => {
    const output = prepare(
      '/home/whatever/centralized-x-boilerplate/assets',
      '/home/whatever/project',
      [
        {
          action: 'full-text-replace',
          source: ['gitignore'],
          destination: ['.gitignore']
        }
      ],
      {
        blacklist: []
      }
    )

    expect(output).toEqual([
      {
        action: 'full-text-replace',
        source: {
          basePath: '/home/whatever/centralized-x-boilerplate/assets',
          filepath: ['gitignore']
        },
        destination: {
          basePath: '/home/whatever/project',
          filepath: ['.gitignore']
        }
      }
    ])
  })
})

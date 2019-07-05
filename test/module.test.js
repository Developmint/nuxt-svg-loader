const consola = require('consola')
const getPort = require('get-port')
const { Nuxt, Builder } = require('nuxt-edge')

jest.setTimeout(60 * 1000)

let nuxt, port

describe('ssr', () => {
  beforeEach(() => {
    consola.mockTypes(() => jest.fn())
  })

  test('emit error when loader can\'t be registered', async () => {
    try {
      await setupNuxt(require('./fixture/configs/error-without-image-loader-rule'))
    } catch (e) {
      expect(e.message).toBe('Nuxt Build Error')
      return
    }
    Error('Never reach this state')
  })

  test('correctly load two lazy-loaded SVGs', async () => {
    const nuxt = await setupNuxt(require('./fixture/configs/default'))
    const { html } = await nuxt.renderRoute('/two')
    expect(html).toMatchSnapshot()
  })

  test('honor custom build.extend function', async () => {
    nuxt = await setupNuxt(require('./fixture/configs/with-extend-fn'))

    const messageInExtendFunction = 'Build fn'
    const consolaMessages = consola.fatal.mock.calls.map(c => c[0])
    expect(consolaMessages).toContain(messageInExtendFunction)

    const { html } = await nuxt.renderRoute('/')
    expect(html).toMatchSnapshot()
  })

  test('honor custom loader options', async () => {
    nuxt = await setupNuxt(require('./fixture/configs/with-options'))

    const { html } = await nuxt.renderRoute('/')
    expect(html).toMatchSnapshot()
  })

  test('correctly load SVG as background image', async () => {
    const nuxt = await setupNuxt(require('./fixture/configs/default'))
    const { html } = await nuxt.renderRoute('/background-image')
    expect(html).toMatchSnapshot()
  })

  afterEach(async () => {
    if (nuxt) {
      await nuxt.close()
    }
  })
})

const setupNuxt = async (config) => {
  const nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  port = await getPort()
  await nuxt.listen(port)

  return nuxt
}

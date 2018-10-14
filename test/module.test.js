const consola = require('consola')
const getPort = require('get-port')
const { Nuxt, Builder } = require('nuxt')

jest.setTimeout(30 * 1000)

let nuxt, port

describe('ssr', () => {
  let log

  beforeEach(() => {
    log = jest.fn()
    consola.clear().add({ log })
  })

  test('emit error when loader can\'t be registered', async () => {
    try {
      await setupNuxt(require('./fixture/configs/error-without-image-loader-rule'))
    } catch (e) {
      expect(e).toBe('Nuxt Build Error')
      return
    }
    Error('Never reach this state')
  })

  test('correctly register SVG loader and load SVG correctly', async () => {
    const nuxt = await setupNuxt(require('./fixture/configs/default'))
    const { html } = await nuxt.renderRoute('/')
    expect(html).toMatchSnapshot()
  })

  test('honor custom build.extend function', async () => {
    nuxt = await setupNuxt(require('./fixture/configs/with-extend-fn'))

    const messageInExtendFunction = 'Build fn'
    const consolaMessages = log.mock.calls.map(c => c[0].message)
    expect(consolaMessages).toContain(messageInExtendFunction)

    const { html } = await nuxt.renderRoute('/')
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

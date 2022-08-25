const debug = process.env.NODE_ENV !== 'production'

export default {
  debug,
  baseUrl: debug ? 'http://127.0.0.1:4523/m1/756211-0-default' : 'https://url.production/api',
}
module.exports = {
  entryPoints: ['./src/index.ts'],
  out: 'docs',
  plugin: ['typedoc-plugin-markdown'],
  readme: 'none',
  entryDocument: 'index.md'
}

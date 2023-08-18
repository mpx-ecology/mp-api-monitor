module.exports = {
  entryPoints: ['./src/index.ts'],
  excludeInternal: true,
  out: 'docs',
  plugin: ['typedoc-plugin-markdown'],
  readme: 'none',
  entryDocument: 'index.md',
  sort: ['source-order'],
  groupOrder: ['Classes', 'Functions', '*'],
  gitRevision: 'master'
}

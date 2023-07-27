import dts from 'rollup-plugin-dts'
import fs from 'node:fs/promises'

export default {
  input: {
    index: './temp/index.d.ts'
  },
  output: {
    dir: 'dist',
    entryFileNames: '[name].d.ts',
    format: 'es',
  },
  plugins: [dts(), addContent({
    src: './src/global.d.ts',
    pre: true
  })],
}

function addContent (options) {
  return {
    name: 'add-global',
    async renderChunk (code, chunk) {
      if (options.filter && !options.filter(code, chunk)) return code
      const { id } = await this.resolve(options.src)
      const content = await fs.readFile(id, { encoding: 'utf8' })
      if (options.pre) return content + '\n' + code
      return code + '\n' + content
    }
  }
}

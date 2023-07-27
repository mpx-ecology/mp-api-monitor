import esbuild from 'rollup-plugin-esbuild'

export default {
  input: {
    index: 'src/index.ts'
  },
  output: {
    dir: 'dist',
    entryFileNames: '[name].esm.js',
    format: 'es'
  },
  plugins: [
    esbuild({
      tsconfig: new URL('./tsconfig', import.meta.url).href,
      sourceMap: false,
      minify: false,
      target: 'es2015',
    })
  ]
}

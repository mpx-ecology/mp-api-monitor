import { execa } from 'execa'
import chalk from 'chalk'

async function run () {
  try {
    await Promise.all([
      execa('rollup', [
        '-c'
      ], { stdio: 'inherit' }),
      execa('npm', [
        'run',
        'build-dts'
      ], { stdio: 'inherit' })
    ])
  } catch (e) {
    console.log(chalk.red('Build fail with err:\n'))
    throw e
  }

  console.log(chalk.green('Build success!'))
}

run()

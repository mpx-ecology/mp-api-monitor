import { execa } from 'execa'
import chalk from 'chalk'
import minimist from 'minimist'
import fs from 'node:fs'
import enquirer from 'enquirer'
import semver from 'semver'
import { createRequire } from 'node:module'

const env = process.env
const { prompt } = enquirer
const currentVersion = createRequire(import.meta.url)('../package.json').version
const args = minimist(process.argv.slice(2))
const preId = args.preid || env.npm_config_preid || semver.prerelease(currentVersion)?.[0]
const skipBuild = args.skipBuild || env.npm_config_skipBuild
const skipDocs = args.skipDocs || env.npm_config_skipDocs
const inc = i => semver.inc(currentVersion, i, preId)
const step = msg => console.log(chalk.cyan(msg))

const versionIncrements = [
  'patch',
  'minor',
  'major',
  ...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] : [])
]

function updateVersions(version) {
  const pkgPath = new URL('../package.json', import.meta.url)
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.version = version
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

async function publishPackage(version) {
  let releaseTag = null
  if (args.tag) {
    releaseTag = args.tag
  } else if (version.includes('alpha')) {
    releaseTag = 'alpha'
  } else if (version.includes('beta')) {
    releaseTag = 'beta'
  } else if (version.includes('rc')) {
    releaseTag = 'rc'
  }

  await execa('npm', [
    'publish',
    ...(releaseTag ? ['--tag', releaseTag] : []),
  ], { stdio: 'inherit' })
}

async function run() {
  let targetVersion = args._[0]
  if (!targetVersion) {
    const { release } = await prompt({
      type: 'select',
      name: 'release',
      message: 'Select release type',
      choices: versionIncrements.map(i => `${i} (${inc(i)})`).concat(['custom'])
    })

    if (release === 'custom') {
      const result = await prompt({
        type: 'input',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion
      })
      targetVersion = result.version
    } else {
      targetVersion = release.match(/\((.*)\)/)[1]
    }
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`)
  }

  step('\nUpdating version...')

  updateVersions(targetVersion)

  if (!skipBuild) {
    step('\nBuilding...')
    await execa('npm', ['run', 'build'], { stdio: 'inherit' })
  }

  if (!skipDocs) {
    step('\nGenerating docs...')
    await execa('npm', ['run', 'docs'], { stdio: 'inherit' })
  }

  step('\nPublishing...')

  try {
    await publishPackage(targetVersion)
  } catch (e) {
    console.log(chalk.red('Publish fail with err:\n'))
    throw e
  }
  console.log(chalk.green('Release success!'))
}

run()

import esbuild from 'esbuild'
import { postcssModules, sassPlugin } from 'esbuild-sass-plugin'
//@ts-ignore
const isDevServer = process.argv.includes('--dev')

esbuild
  .build({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    outfile: 'www/static/bundle.js',
    minify: !isDevServer,
    sourcemap: true,
    treeShaking: true,
    incremental: isDevServer,
    define: {
      'process.env.NODE_ENV': isDevServer ? '"development"' : '"production"',
    },
    watch: isDevServer && {
      onRebuild(err) {
        err ? console.log('❌ Failed') : console.log('✅ Updated')
      },
    },
    plugins: [
      sassPlugin({
        filter: /.module.s?css$/,
        type: 'css',
        transform: postcssModules({}),
      }),
      sassPlugin({
        type: 'css',
      }),
    ],
  })
  .catch((err) => {
    console.log(err)
    //@ts-ignore
    process.exit(1)
  })

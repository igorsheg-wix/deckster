import esbuild from 'esbuild'
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin'
const isDevServer = process.argv.includes('--dev')

esbuild
  .build({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    outfile: 'www/static/bundle.js',
    minify: !isDevServer,
    sourcemap: true,
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
  .catch(() => process.exit(1))

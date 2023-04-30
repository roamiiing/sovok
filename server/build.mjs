import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/app.ts'],
  bundle: true,
  outfile: '../dist/server/app.js',
  target: 'node16',
  platform: 'node',
  minify: true,
  sourcemap: 'inline',
  external: ['express', 'prisma', '@prisma/client'],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
})

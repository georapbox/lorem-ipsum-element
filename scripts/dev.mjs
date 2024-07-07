import * as esbuild from 'esbuild';

const ctx = await esbuild.context({
  entryPoints: ['src/lorem-ipsum.js', 'src/lorem-ipsum-defined.js'],
  bundle: true,
  sourcemap: true,
  format: 'esm',
  outdir: 'dist',
  metafile: true,
  plugins: [
    {
      name: 'rebuild-notify',
      setup(build) {
        build.onEnd(result => {
          console.log(`Build ended with ${result.errors.length} errors`);
        });
      }
    }
  ]
});

await ctx.watch();

require('nexe').compile({
  build: true,
  // clean: true,
  input: './build/cli.js',
  targets: ['macos'],
  output: './dist/baseline-osx',
  // resource: ['./src/template/**/*'],
  patches: [
    (x, next) => {
      x.code = () => [x.shims.join(''), x.input].join(';')
      return next()
    },
    async (compiler, next) => {
      await compiler.setFileContentsAsync(
        'lib/_third_party_main.js',
        compiler.code()
      )
      compiler.options.empty = true // <-- ADDED THIS (hack)
      return next()
    }
  ]
});
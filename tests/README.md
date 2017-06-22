AssemblyScript Tests
====================

Most of the test process consists of running the compiler for each AssemblyScript program (*.ts) in [fixtures/](./fixtures) and comparing the resulting text output to a pre-checked sample (a .wast file in s-expression syntax next to the .ts file).

When adding new tests, passing the `--create` option to the test runner will automatically create a test sample from the current run's output:

```
$> npm test -- --create
```

The initial test sample must then be checked by hand for possible errors before committing it.

Note that test samples are reduced to just the relevant parts starting at the first `(export ...)` section.

Additional compiler options can be specified per test case on the respective .ts-file's first line as a JSON object starting with a `//!` comment. For example, when not testing malloc itself, specifiying at least `//! { "malloc": false }` is recommended.

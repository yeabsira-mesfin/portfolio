const { spawnSync } = require("child_process");
const result = spawnSync(process.execPath, [require.resolve("react-scripts/bin/react-scripts"), "build"], {
  stdio: "inherit",
  env: { ...process.env, GENERATE_SOURCEMAP: "false", INLINE_RUNTIME_CHUNK: "false" },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);

import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["**/node_modules/**", "**/.next/**", "**/.wrangler/**", "**/dist/**", "**/worker-configuration.d.ts"] },
  ...tseslint.configs.recommended.map((configuration) => ({
    ...configuration,
    files: ["apps/api/src/**/*.ts", "packages/contracts/src/**/*.ts", "tests/**/*.ts"],
  })),
);
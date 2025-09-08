import { Alias, defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'url';
import vue from '@vitejs/plugin-vue'

const env = loadEnv(
    'all',
    process.cwd()
);

const getBase = () => {
  if (!env["VITE_BASE_URL"]) {
    return './'
    throw new Error("BASE_URL environment variable is required");
  }
  return env["VITE_BASE_URL"];
}

const getAliasObject = (findName: string, path: string): Alias => {
  return {
    find: findName,
    replacement: fileURLToPath(new URL(path, import.meta.url)),
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({ script: { defineModel: true } })],
  base: getBase(),
  server: {
    port: 8100,
        proxy: {
            "/api": {
                target: "http://127.0.0.1:8000",
                changeOrigin: true,
                secure: false,
            }
        },
  },
  resolve: {
    alias: [
      getAliasObject("@api", "./src/core/api"),
      getAliasObject("@components", "./src/core/components"),
      getAliasObject("@services/core", "./src/core/services"),
      getAliasObject("@services", "./src/services"),
    ]
  }
})

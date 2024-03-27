// vite.config.ts
import { defineConfig } from "file:///Users/gabrielnbds/projects/inertia-19/node_modules/vite/dist/node/index.js";
import { getDirname } from "file:///Users/gabrielnbds/projects/inertia-19/node_modules/@adonisjs/core/build/src/helpers/main.js";
import inertia from "file:///Users/gabrielnbds/projects/inertia-19/node_modules/@adonisjs/inertia/build/src/plugins/vite.js";
import react from "file:///Users/gabrielnbds/projects/inertia-19/node_modules/@vitejs/plugin-react/dist/index.mjs";
import adonisjs from "file:///Users/gabrielnbds/projects/inertia-19/node_modules/@adonisjs/vite/build/src/client/main.js";
import { resolve } from "node:path";
var __vite_injected_original_import_meta_url = "file:///Users/gabrielnbds/projects/inertia-19/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: "inertia/app/ssr.tsx" } }),
    react(),
    adonisjs({ entrypoints: ["inertia/app/app.tsx"], reload: ["resources/views/**/*.edge"] })
  ],
  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      "@/": `${resolve(getDirname(__vite_injected_original_import_meta_url), "inertia")}/`,
      "~/": `${resolve(getDirname(__vite_injected_original_import_meta_url), ".")}/`
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZ2FicmllbG5iZHMvcHJvamVjdHMvaW5lcnRpYS0xOVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2dhYnJpZWxuYmRzL3Byb2plY3RzL2luZXJ0aWEtMTkvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2dhYnJpZWxuYmRzL3Byb2plY3RzL2luZXJ0aWEtMTkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgZ2V0RGlybmFtZSB9IGZyb20gJ0BhZG9uaXNqcy9jb3JlL2hlbHBlcnMnXG5pbXBvcnQgaW5lcnRpYSBmcm9tICdAYWRvbmlzanMvaW5lcnRpYS9jbGllbnQnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgYWRvbmlzanMgZnJvbSAnQGFkb25pc2pzL3ZpdGUvY2xpZW50J1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIGluZXJ0aWEoeyBzc3I6IHsgZW5hYmxlZDogdHJ1ZSwgZW50cnlwb2ludDogJ2luZXJ0aWEvYXBwL3Nzci50c3gnIH0gfSksXG4gICAgcmVhY3QoKSxcbiAgICBhZG9uaXNqcyh7IGVudHJ5cG9pbnRzOiBbJ2luZXJ0aWEvYXBwL2FwcC50c3gnXSwgcmVsb2FkOiBbJ3Jlc291cmNlcy92aWV3cy8qKi8qLmVkZ2UnXSB9KSxcbiAgXSxcblxuICAvKipcbiAgICogRGVmaW5lIGFsaWFzZXMgZm9yIGltcG9ydGluZyBtb2R1bGVzIGZyb21cbiAgICogeW91ciBmcm9udGVuZCBjb2RlXG4gICAqL1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdALyc6IGAke3Jlc29sdmUoZ2V0RGlybmFtZShpbXBvcnQubWV0YS51cmwpLCAnaW5lcnRpYScpfS9gLFxuICAgICAgJ34vJzogYCR7cmVzb2x2ZShnZXREaXJuYW1lKGltcG9ydC5tZXRhLnVybCksICcuJyl9L2AsXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9TLFNBQVMsb0JBQW9CO0FBQ2pVLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8sYUFBYTtBQUNwQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxjQUFjO0FBQ3JCLFNBQVMsZUFBZTtBQUw0SixJQUFNLDJDQUEyQztBQU9yTyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVMsTUFBTSxZQUFZLHNCQUFzQixFQUFFLENBQUM7QUFBQSxJQUNyRSxNQUFNO0FBQUEsSUFDTixTQUFTLEVBQUUsYUFBYSxDQUFDLHFCQUFxQixHQUFHLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxDQUFDO0FBQUEsRUFDMUY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTUEsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsTUFBTSxHQUFHLFFBQVEsV0FBVyx3Q0FBZSxHQUFHLFNBQVMsQ0FBQztBQUFBLE1BQ3hELE1BQU0sR0FBRyxRQUFRLFdBQVcsd0NBQWUsR0FBRyxHQUFHLENBQUM7QUFBQSxJQUNwRDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=

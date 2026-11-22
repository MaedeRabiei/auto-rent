
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/auto-rent/",

  plugins: [tailwindcss()],

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        aboutus: resolve(__dirname, "aboutus.html"),
        blog: resolve(__dirname, "blog.html"),
        rentCar: resolve(__dirname, "rent-car.html"),
     
      },
    },
  },
});

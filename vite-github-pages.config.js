// Configuration for GitHub Pages deployment
export const githubPagesConfig = {
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  base: './', // Use relative paths for GitHub Pages
};
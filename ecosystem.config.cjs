module.exports = {
  apps: [{
    name: 'astro-portfolio',
    script: './dist/server/entry.mjs',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env_file: '.env'
  }]
};

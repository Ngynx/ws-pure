module.exports = {
    apps: [{
        name: 'wspure',
        script: 'index.js',
        watch: false,
        autorestart: true,
        exp_backoff_restart_delay: 1000,
        env: {
            NODE_ENV: 'development',
            PORT: 3602,
            NEST_HOST: 'http://127.0.0.1:3601',
            NEST_EVENT: 'gps_data'
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: 3602,
            NEST_HOST: 'http://34.123.179.130:3601',
            NEST_EVENT: 'gps_data'
        },
        env_production_cerro_colorado: {
            NODE_ENV: 'ccproduction',
            PORT: 3602,
            NEST_HOST: 'http://34.44.113.186:3601',
            NEST_EVENT: 'gps_data'
        },
    }]
} 
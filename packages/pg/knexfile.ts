const knexConfig = {
    development: {
        client: 'pg',
        connection: {
            host: 'your_database_host',
            port: 'your_database_port',
            database: 'your_database_name',
            user: 'your_database_user',
            password: 'your_database_password',
        },
        migrations: {
            directory: './migrations',
        },
    },
};

export default knexConfig
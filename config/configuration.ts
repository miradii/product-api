
export default () => ({
    port: parseInt(process.env.PORT, 10) || 8080,
    database: {
        url: process.env.DATABASE_URL,
        shadowUrl: process.env.SHADOW_DB_URL
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET
    },
    arvan: {
        endpoint: process.env.ARVAN_ENDPOINT_URL,
        accessKeyId: process.env.ARVAN_ACCESS_KEY_ID,
        secretKey: process.env.ARVAAN_SECRET_KEY

    }
});

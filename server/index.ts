import connectDB from './src/database/connector';
import { app } from './src/server';
import config from './src/utils/config';

const { REST_HOST: HOST, REST_PORT: PORT }: any = config;

app.listen(PORT, HOST, async () => {
    await connectDB(config.DB_URI);
    console.log(`Listening on port ${HOST}:${PORT}`);
});
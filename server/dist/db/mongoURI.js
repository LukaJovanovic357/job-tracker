import { config } from 'dotenv';
config({
    path: '../../../server/.env',
});
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
}
export default MONGO_URI;
//# sourceMappingURL=mongoURI.js.map
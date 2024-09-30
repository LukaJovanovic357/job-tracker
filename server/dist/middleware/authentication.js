import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';
import 'dotenv/config';
const authentication = async (req, _, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid');
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        const testUser = payload.userId === '66aba07c4527a58878de65ea';
        //@ts-ignore
        req.user = { userId: payload.userId, testUser };
        next();
    }
    catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }
};
export { authentication };
//# sourceMappingURL=authentication.js.map
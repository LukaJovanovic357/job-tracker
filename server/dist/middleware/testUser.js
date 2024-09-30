import { BadRequestError } from '../errors/index.js';
const testUser = (req, res, next) => {
    //@ts-ignore
    if (req.user.testUser) {
        throw new BadRequestError('Test User. Read Only');
    }
    next();
};
export { testUser };
//# sourceMappingURL=testUser.js.map
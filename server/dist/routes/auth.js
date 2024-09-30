import express from 'express';
import { login, register, updateUser } from '../controllers/auth.js';
import { authentication as authenticateUser } from '../middleware/authentication.js';
import { testUser } from '../middleware/index.js';
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.patch('/updateUser', authenticateUser, testUser, updateUser);
export default router;
//# sourceMappingURL=auth.js.map
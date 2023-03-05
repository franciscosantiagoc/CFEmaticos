
import { Router } from 'express';
import userRoutes from './User'

const router = Router();
router.use("/users", userRoutes);


export default router;
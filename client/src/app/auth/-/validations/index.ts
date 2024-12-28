import {z} from 'zod';

export const loginSchema = z.object({
    firstName:z.string().min(5).max(20),
    email:z.string().email()
})
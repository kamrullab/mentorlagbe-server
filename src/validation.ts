import{z}from"zod";
export const registerSchema=z.object({name:z.string().trim().min(2).max(80),email:z.string().email().transform(v=>v.toLowerCase()),password:z.string().min(8).max(72),role:z.enum(["student","tutor"])});
export const loginSchema=z.object({email:z.string().email().transform(v=>v.toLowerCase()),password:z.string().min(1)});
export const tuitionSchema=z.object({title:z.string().trim().min(5).max(120),subject:z.string().trim().min(2).max(60),classLevel:z.string().trim().min(2).max(50),mode:z.enum(["Online","Offline"]),location:z.string().trim().min(2).max(120),monthlyFee:z.coerce.number().positive().max(1000000),daysPerWeek:z.coerce.number().int().min(1).max(7),bannerImage:z.string().url(),description:z.string().trim().min(40).max(4000)});
export const applicationSchema=z.object({studentPhone:z.string().trim().min(7).max(20),preferredSchedule:z.string().trim().min(3).max(200),studentNote:z.string().trim().min(10).max(1000)});
export const profileSchema=z.object({name:z.string().trim().min(2).max(80),phone:z.string().trim().max(20).optional(),bio:z.string().trim().max(600).optional(),image:z.string().url().optional()});

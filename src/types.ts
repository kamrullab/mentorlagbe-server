import type { ObjectId } from "mongodb";
export type Role="student"|"tutor"|"admin";
export interface RefreshSession{tokenHash:string;expiresAt:Date;createdAt:Date}
export interface User{_id?:ObjectId;id?:string;authModel?:string;name:string;email:string;image?:string;role:Role;isSuperAdmin?:boolean;socialRoleChosen?:boolean;phone?:string;bio?:string;plan:"free"|"pro";passwordHash?:string;savedTuitionIds:string[];refreshSessions?:RefreshSession[];createdAt:Date;updatedAt:Date}
export interface Review{studentEmail:string;studentName:string;rating:number;feedback:string;createdAt:Date}
export interface Tuition{_id?:ObjectId;title:string;subject:string;classLevel:string;mode:"Online"|"Offline";location:string;monthlyFee:number;daysPerWeek:number;bannerImage:string;description:string;tutorName:string;tutorEmail:string;approvalStatus:"pending"|"approved"|"rejected";isActive:boolean;reviews:Review[];createdAt:Date;updatedAt:Date}
export interface Application{_id?:ObjectId;tuitionId:string;tuitionTitle:string;subject:string;monthlyFee:number;tutorName:string;tutorEmail:string;studentName:string;studentEmail:string;studentPhone:string;preferredSchedule:string;studentNote:string;status:"pending"|"accepted"|"rejected";appliedAt:Date;updatedAt:Date}
export interface Payment{_id?:ObjectId;userEmail:string;userName:string;userRole:Role;planName:string;amount:number;currency:string;transactionId:string;stripeSessionId:string;paymentStatus:"paid";paidAt:Date}

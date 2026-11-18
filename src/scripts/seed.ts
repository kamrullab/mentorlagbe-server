import { auth } from "../auth/better-auth.js";
import { collections, ensureIndexes } from "../db.js";
import { env } from "../config/env.js";

const now = new Date();
const password = env.ADMIN_PASSWORD || "ChangeMe123!";
const { users, tuitions, applications } = await collections();
const tutors = [
  { name: "Farhana Rahman", email: "farhana.tutor@example.com" },
  { name: "Ayman Kabir", email: "ayman.tutor@example.com" },
  { name: "Nusrat Jahan", email: "nusrat.tutor@example.com" },
];
const students = [
  { name: "Nabila Ahmed", email: "nabila.student@example.com" },
  { name: "Rafi Hasan", email: "rafi.student@example.com" },
  { name: "Sadia Islam", email: "sadia.student@example.com" },
];

async function account(name: string, email: string, role: "student" | "tutor" | "admin", plan: "free" | "pro") {
  if (!await users.findOne({ authModel: "user", email })) {
    await auth.api.signUpEmail({ body: { name, email, password, role: role === "admin" ? "student" : role } });
    await users.updateOne({ authModel: "user", email }, { $set: { role, plan, savedTuitionIds: [], updatedAt: new Date() } });
  }
}

if (env.ADMIN_EMAIL) await account("MentorLagbe Admin", env.ADMIN_EMAIL, "admin", "pro");
for (const tutor of tutors) await account(tutor.name, tutor.email, "tutor", "pro");
for (const student of students) await account(student.name, student.email, "student", "free");

const subjects = ["Mathematics", "Physics", "Programming", "IELTS", "English", "Chemistry", "Biology", "Accounting", "Economics", "Statistics", "Web Development", "SAT Math"];
const photos = ["1509062522246-3755977927d7", "1635070041078-e363dbe005cb", "1516321318423-f06f85e504b3"];
if (!await tuitions.countDocuments()) {
  await tuitions.insertMany(subjects.map((subject, i) => ({
    title: `Master ${subject} with guided practice`, subject,
    classLevel: i % 3 === 0 ? "HSC" : i % 3 === 1 ? "University" : "SSC",
    mode: i % 2 ? "Online" as const : "Offline" as const,
    location: i % 2 ? "Google Meet" : "Dhanmondi, Dhaka",
    monthlyFee: 2500 + i * 250, daysPerWeek: 3,
    bannerImage: `https://images.unsplash.com/photo-${photos[i % 3]}?auto=format&fit=crop&w=900&q=80`,
    description: `A structured ${subject} mentorship with concept lessons, guided practice, weekly feedback and exam-focused support for ambitious learners.`,
    tutorName: tutors[i % 3]!.name, tutorEmail: tutors[i % 3]!.email,
    approvalStatus: "approved" as const, isActive: true, reviews: [],
    createdAt: new Date(now.getTime() - i * 86400000), updatedAt: now,
  })));
}

const seededTuitions = await tuitions.find({ approvalStatus: "approved" }).sort({ createdAt: -1 }).limit(6).toArray();
for (let i = 0; i < seededTuitions.length; i++) {
  const tuition = seededTuitions[i]!;
  const student = students[i % students.length]!;
  const tuitionId = tuition._id!.toString();
  await applications.updateOne(
    { tuitionId, studentEmail: student.email },
    { $setOnInsert: {
      tuitionId, tuitionTitle: tuition.title, subject: tuition.subject, monthlyFee: tuition.monthlyFee,
      tutorName: tuition.tutorName, tutorEmail: tuition.tutorEmail, studentName: student.name,
      studentEmail: student.email, studentPhone: `0171000000${i}`,
      preferredSchedule: i % 2 ? "Weekend evenings" : "Weekday afternoons",
      studentNote: `I want structured support and regular feedback in ${tuition.subject}.`,
      status: i < 3 ? "accepted" as const : "pending" as const,
      appliedAt: new Date(now.getTime() - (i + 1) * 43200000), updatedAt: now,
    } }, { upsert: true },
  );
}

await ensureIndexes();
console.log("Seed complete: connected users, tuitions and applications in four physical collections only.");
process.exit(0);

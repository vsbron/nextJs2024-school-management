import { z } from "zod";

// Announcements form schema
export const announcementSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Event name is required!" }),
  description: z.string().min(1, { message: "Event description is required!" }),
  date: z.coerce.date({ message: "Date is required" }),
  classId: z.coerce.number().optional(),
});
export type AnnouncementInputs = z.infer<typeof announcementSchema>;

// Assignments form schema
export const assignmentSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Subject name is required!" }),
  startDate: z.coerce.date({ message: "Start date is required" }),
  dueDate: z.coerce.date({ message: "Due date is required" }),
  lessonId: z.coerce.number({ message: "Teacher name is required!" }),
});
export type AssignmentInputs = z.infer<typeof assignmentSchema>;

// Attendance form schema
export const attendanceSchema = z.object({
  id: z.coerce.number().optional(),
  studentId: z.string({ message: "Student name is required" }),
  lessonId: z.coerce.number({ message: "Lesson is required!" }),
  date: z.coerce.date({ message: "Date is required" }),
  present: z.enum(["YES", "NO"], { message: "This field is required" }),
});
export type AttendanceInputs = z.infer<typeof attendanceSchema>;

// Classes form schema
export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Class is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
  supervisorId: z.coerce.string().optional(),
});
export type ClassInputs = z.infer<typeof classSchema>;

// Events form schema
export const eventSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Event name is required!" }),
  description: z.string().min(1, { message: "Event description is required!" }),
  startTime: z.coerce.date({ message: "Start time is required" }),
  endTime: z.coerce.date({ message: "End time is required" }),
  classId: z.coerce.number().optional(),
});
export type EventInputs = z.infer<typeof eventSchema>;

// Exams form schema
export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Subject name is required!" }),
  startTime: z.coerce.date({ message: "Start time is required" }),
  endTime: z.coerce.date({ message: "End time is required" }),
  lessonId: z.coerce.number({ message: "Lesson is required!" }),
});
export type ExamInputs = z.infer<typeof examSchema>;

// Lessons form schema
export const lessonSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Name is required!" }),
  subjectId: z.coerce.number({ message: "Subject is required" }),
  classId: z.coerce.number({ message: "Class is required" }),
  startTime: z.coerce.date({ message: "Start time is required" }),
  endTime: z.coerce.date({ message: "End time is required" }),
  teacherId: z.string().min(1, { message: "Name is required!" }),
});
export type LessonInputs = z.infer<typeof lessonSchema>;

// Parents form schema
export const parentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string(),
  address: z.string().min(1, { message: "Address is required!" }),
});
export type ParentInputs = z.infer<typeof parentSchema>;

// Results form schema
export const resultSchema = z.object({
  id: z.coerce.number().optional(),
  score: z.coerce
    .number()
    .min(0, { message: "Score should be at least 0" })
    .max(100, { message: "Score cannot be higher than 100" }),
  examId: z.coerce.number(),
  studentId: z.string().min(1, { message: "Student name is required!" }),
});
export type ResultInputs = z.infer<typeof resultSchema>;

// Students form schema
export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().min(1, { message: "Address is required!" }),
  description: z.string().optional(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required" }),
  gradeId: z.coerce.number().min(1, { message: "Grade ID is required" }),
  classId: z.coerce.number().min(1, { message: "Class ID is required" }),
  parentId: z.string().min(1, { message: "Parent ID is required" }),
});
export type StudentInputs = z.infer<typeof studentSchema>;

// Subjects form schema
export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject is required!" }),
  teachers: z.array(z.string()), // Teacher IDs
});
export type SubjectInputs = z.infer<typeof subjectSchema>;

// Teachers form schema
export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  description: z.string().optional(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required" }),
  subjects: z.array(z.string()),
});
export type TeacherInputs = z.infer<typeof teacherSchema>;

import { z } from "zod";

// Announcements form schema
export const announcementSchema = z.object({
  title: z.string().min(1, { message: "Subject is required!" }),
  class: z.string().min(1, { message: "Class is required!" }),
  date: z.string().min(1, { message: "Due date is required!" }),
});
export type AnnouncementInputs = z.infer<typeof announcementSchema>;

// Assignments form schema
export const assignmentSchema = z.object({
  subject: z.string().min(1, { message: "Subject is required!" }),
  class: z.string().min(1, { message: "Class is required!" }),
  teacher: z.string().min(1, { message: "Teacher is required!" }),
  dueDate: z.string().min(1, { message: "Due date is required!" }),
});
export type AssignmentInputs = z.infer<typeof assignmentSchema>;

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
  title: z.string().min(1, { message: "Event name is required!" }),
  class: z.string().min(1, { message: "Class is required!" }),
  date: z.string().min(1, { message: "Date is required!" }),
  startTime: z.string().min(1, { message: "Start time is required!" }),
  endTime: z.string().min(1, { message: "End time is required" }),
});
export type EventInputs = z.infer<typeof eventSchema>;

// Exams form schema
export const examSchema = z.object({
  subject: z.string().min(1, { message: "Subject is required!" }),
  class: z.string().min(1, { message: "Class is required!" }),
  teacher: z.string().min(1, { message: "Teacher name is required!" }),
  date: z.string().min(1, { message: "Date is required!" }),
});
export type ExamInputs = z.infer<typeof examSchema>;

// Lessons form schema
export const lessonSchema = z.object({
  subject: z.string().min(1, { message: "Subject is required!" }),
  class: z.string().min(1, { message: "Class is required!" }),
  teacher: z.string().min(1, { message: "Teacher name is required!" }),
});
export type LessonInputs = z.infer<typeof lessonSchema>;

// Parents form schema
export const parentSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long!" }),
  name: z.string().min(1, { message: "Name is required!" }),
  students: z.string().min(1, { message: "Students are required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
});
export type ParentInputs = z.infer<typeof parentSchema>;

// Results form schema
export const resultSchema = z.object({
  subject: z.string().min(1, { message: "Subject is required!" }),
  student: z.string().min(1, { message: "Student name is required!" }),
  score: z.string().min(1, { message: "Score is required!" }),
  teacher: z.string().min(1, { message: "Teacher name is required!" }),
  class: z.string().min(1, { message: "Class is required!" }),
  date: z.string().min(1, { message: "Date is required" }),
  type: z.date({ message: "Type is required!" }),
});
export type ResultInputs = z.infer<typeof resultSchema>;

// Students form schema
export const studentSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  grade: z.number().min(1, { message: "Grade is required!" }),
  class: z.string().min(1, { message: "Class is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required" }),
  birthday: z.date({ message: "Birthday is required!" }),
  sex: z.enum(["male", "female"], { message: "Sex is required" }),
  avatar: z.instanceof(File, { message: "Image is required" }),
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
    .min(6, { message: "Password must be at least 8 characters long!" }),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z.string().email({ message: "Invalid email address!" }).optional(),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required" }),
  subjects: z.array(z.string()),
});
export type TeacherInputs = z.infer<typeof teacherSchema>;

// Data type for Announcement
export type Announcement = {
  id: number;
  title: string;
  class: string;
  date: string;
};

// Data type for Assignment
export type Assignment = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  dueDate: string;
};

// Data type for Class
export type Class = {
  id: number;
  class: string;
  capacity: number;
  grade: number;
  supervisor: string;
};

// Data type for Event
export type Event = {
  id: number;
  title: string;
  class: string;
  date: string;
  startTime: string;
  endTime: string;
};

// Data type for Exam
export type Exam = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  date: string;
};

// Data type for Lesson
export type Lesson = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
};

// Data type for Parent
export type Parent = {
  id: number;
  name: string;
  students: string[];
  email?: string;
  phone: string;
  address: string;
};

// Data type for Result
export type Result = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  student: string;
  date: string;
  type: "exam" | "assignment";
  score: number;
};

// Data type for Subject
export type Subject = {
  id: number;
  name: string;
  teachers: string[];
};

// Prop types for Form modal
export type FormModalProps<T> = {
  table:
    | "teacher"
    | "student"
    | "subject"
    | "result"
    | "parent"
    | "lesson"
    | "exam"
    | "event"
    | "class"
    | "assignment"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: T;
  id?: string | number;
};

// SearchParams type
export type SearchParamsType = { [keys: string]: string | undefined };

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

// Object type for Route Access Map
export type RouteAccessMap = {
  [key: string]: string[];
};

// Prop types for the UserCard component
export type UserCardType = "admins" | "teachers" | "students" | "parents";

// Prop types for the Chart components
export type CountChartType = { boys: number; girls: number };
export type AttendanceChartType = {
  name: string;
  present: number;
  absent: number;
}[];

// Prop type for the Big Calendar component
export type BigCalendarType = {
  type: "teacherId" | "classId";
  id: string | number;
};

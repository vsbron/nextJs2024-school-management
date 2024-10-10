import { Dispatch, SetStateAction } from "react";
import { Student, Teacher } from "@prisma/client";
import { FieldError } from "react-hook-form";

/** CHARTS & CALENDARS */
export type AttendanceChartData = {
  data: {
    name: string;
    present: number;
    absent: number;
  }[];
};
export type BigCalendarContainerProps = {
  type: "teacherId" | "classId";
  id: string | number;
};
export type BigCalendarData = {
  data: {
    title: string;
    start: Date;
    end: Date;
  }[];
};
export type CountChartProps = { boys: number; girls: number };
export type EventListProps = { dateParam: string | undefined };

/** COMMON **/
export type ErrorType = { e: unknown };
export type SearchParamsProp = {
  searchParams: { [keys: string]: string | undefined };
};

/** COMPONENTS **/
export type ActiveLinkProps = { href: string; children: React.ReactNode };
export type HomePageSideProps = { children: React.ReactNode };
export type InfoCardTypes = {
  type: "admins" | "teachers" | "students" | "parents";
};
export type ShortcutLinkProps = { href: string; children: string };
export type SmallCardProps = { type: string; children: React.ReactNode };
export type StudentAttendanceCardProps = { id: string };
export type UserCardProps = { person: Student | Teacher };

/** FORM **/
export type FormModalProps<T> = {
  table: TableTypes;
  type: "create" | "update" | "delete";
  data?: T;
  id?: string | number;
};
export type FormContainerProps<T> = {
  table: TableTypes;
  type: "create" | "update" | "delete";
  data?: T;
  id?: string | number;
};
export type FormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  type: "create" | "update";
  data?: any;
  relatedData?: any;
};
export type InputProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  hidden?: boolean;
  inputAttrs?: React.InputHTMLAttributes<HTMLInputElement>;
};

/** TABLES **/
type TableTypes =
  | "announcement"
  | "assignment"
  | "attendance"
  | "class"
  | "event"
  | "exam"
  | "lesson"
  | "parent"
  | "result"
  | "student"
  | "subject"
  | "teacher";
export type TableButtonsProps = {
  role: string | undefined;
  table: TableTypes;
};
export type TableHeaderProps = { children: React.ReactNode };
export type TableHeadingProps = { children: string };

/** OTHER **/
export type PaginationProps = {
  page: number;
  count: number;
  data: any[];
  queryParams: { [key: string]: string | undefined };
};
export type RouteAccessMap = {
  [key: string]: string[];
};
export type SingleStudentPageProps = { params: { studentId: string } };
export type SingleTeacherPageProps = { params: { teacherId: string } };
export type TableProps<T> = {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: T) => React.ReactNode;
  data: T[];
};

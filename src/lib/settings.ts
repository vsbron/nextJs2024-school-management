import { RouteAccessMap } from "./types";

// Number of items listed on each table list page
export const ITEMS_PER_PAGE = 10;

// Setting which routes could be accessed by what user roles
export const routeAccessMap: RouteAccessMap = {
  "/admin(.*)": ["admin"],
  "/student(.*)": ["student"],
  "/teacher(.*)": ["teacher"],
  "/parent(.*)": ["parent"],

  "/list/teachers(.*)": ["admin", "teacher"],
  "/list/students(.*)": ["admin", "teacher", "parent"],
  "/list/parents(.*)": ["admin", "teacher"],
  "/list/subjects(.*)": ["admin"],
  "/list/lessons(.*)": ["admin", "teacher", "parent"],
  "/list/classes(.*)": ["admin", "teacher"],

  "/list/exams(.*)": ["admin", "teacher", "student", "parent"],
  "/list/assignments(.*)": ["admin", "teacher", "student", "parent"],
  "/list/results(.*)": ["admin", "teacher", "student", "parent"],
  "/list/attendance(.*)": ["admin", "teacher", "student", "parent"],
  "/list/events(.*)": ["admin", "teacher", "student", "parent"],
  "/list/announcements(.*)": ["admin", "teacher", "student", "parent"],
};

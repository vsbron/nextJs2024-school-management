# School Management App

A comprehensive School Management App designed to create and manage schedules, activities, and resources for teachers, students, and parents.

## Features

- **Authentication & Roles**

  - Secure login with support for 4 user roles: **Admin**, **Teacher**, **Student**, and **Parent**.
  - Role-specific access control:
    - Admins have full access to manage data.
    - Teachers, Students, and Parents can only manage or view data relevant to them.

- **Dashboard Overview**

  - A dynamic dashboard based on the user role:
    - **Admin:** Full school activity overview with charts, schedules, calendars, events, and announcements.
    - **Teacher/Student:** Personalized data such as schedules, assignments, exams, and upcoming events.
    - **Parent:** Access to relevant student data like grades, schedules, and events.
  - Left-side navigation for quick access to data lists (exams, assignments, announcements, etc.).

- **Data Management**

  - List views for managing different data entities (Teachers, Students, Parents, Lessons, Exams, Assignments, etc.).
  - CRUD functionality (Create, Read, Update, Delete) for each role:
    - **Admin:** Can create, view, edit, and delete all data.
    - **Teachers:** Can manage exams, assignments and others.
    - **Students/Parents:** Limited to viewing data.

- **User Profiles**

  - Detailed teacher and student profiles, including:
    - Personal information (name, phone, address, email, birthday, blood type etc.).
    - Individual schedules and more.
  - Admins have full editing access to all user profiles.

- **User Creation with Clerk**
  - When creating new Teachers, Students, or Parents, their accounts are automatically generated via the **Clerk** authentication service.

## Technical Details

- **Framework:** Built with **Next.js** and **TypeScript** for scalable and efficient development.
- **Styling:** Managed using **Tailwind CSS** for responsive, mobile-friendly design (supporting screens as small as 360px wide).
- **Authentication:** Powered by **Clerk** for role-based user authentication.
- **Forms:** Handled with **React Hook Form**, and validated using **Zod** for reliable form submission.
- **Database:** Managed with **Prisma**, with data stored in **Docker** containers.
- **File Storage:** Image uploads and storage are handled through **Cloudinary**.

## Improvements

- Layout features more semantic HTML elements;
- Backspace key brings user back to previous page;
- Current path gets highlighted in the side menu;
- Filled all the rest of the forms that were missing;
- New UI components were added;
- Color scheme was changed;
- Icons were replaced for vector-based icons;
- Improved some forms to be more self explanatory and to improve UI;
- Added number of helper function to fix the date differences between UI and Database due to timezone;
- Big Calendar component now features navigation buttons;
- Better, more detailed error messages;

### Live version

- No live version (project requires docker and creating a database from a seed file)

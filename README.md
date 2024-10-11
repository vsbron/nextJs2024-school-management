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

- **Enhanced Layout:** Utilized more semantic HTML elements for improved accessibility and structure.
- **Updated Color Scheme:** Color scheme has been updated to improve visual appeal.
- **Vector-based Icons:** Icons have been replaced with scalable vector-based alternatives for better clarity and performance.
- **New UI Components:** Introduced new user interface components for a more polished and user-friendly experience.
- **Mobile Optimization:** Refined the mobile layout to support resolutions down to 360px for full responsiveness.
- **Form Completion:** All missing forms have been filled and completed, ensuring full functionality.
- **Form Enhancements:** Improved form descriptions for clarity and a more intuitive user interface.
- **Dynamic Path Highlighting:** The current navigation path is highlighted in the side menu for better user orientation.
- **Navigation Improvements:** The backspace key now takes the user to the previous page, improving usability.
- **Favicon Support:** Favicons have been added for a more polished browser experience.
- **Time Zone Adjustments:** Implemented helper functions to resolve date discrepancies between the UI and database caused by time zone differences.
- **Calendar Navigation:** Added navigation buttons to the Big Calendar component for easier event management.
- **Improved Search Functionality:** Enhanced search features on list pages, with warning messages displayed when no results are found.
- **Role-based Filtering:** Optimized filters on list pages, allowing different roles to explore relevant data more efficiently.
- **Expanded Teacher Permissions:** Teachers can now manage a wider range of data, enhancing their control over assignments and lessons.
- **Pagination Fixes:** When deleting an item, users are automatically redirected to the previous page if no items remain on the current page.
- **Error Handling:** Error messages have been made more descriptive to assist users in troubleshooting issues.

### Live version

- No live version (project requires docker and creating a database from a seed file)

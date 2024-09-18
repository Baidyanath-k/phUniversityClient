import AcademicDepartment from "../../pages/admin/academicManagement/AcademicDepartment";
import AcademicFaculty from "../../pages/admin/academicManagement/AcademicFaculty";
import AcademicSemester from "../../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicDepartment from "../../pages/admin/academicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../../pages/admin/academicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../../pages/admin/academicManagement/CreateAcademicSemester";
import AdminDashboard from "../../pages/admin/AdminDashboard/AdminDashboard";
import AllCourses from "../../pages/admin/CourseManagement/AllCourses";
import CreateCourse from "../../pages/admin/CourseManagement/CreateCourse";
import CreateOfferedCourse from "../../pages/admin/CourseManagement/CreateOfferedCourse";
import SemesterRegistration from "../../pages/admin/CourseManagement/CreateSemesterRegistration";
import RegisteredSemester from "../../pages/admin/CourseManagement/RegisteredSemester";
import CreateAdmin from "../../pages/admin/UserCreateManagement/CreateAdmin";
import CreateFaculty from "../../pages/admin/UserCreateManagement/CreateFaculty";
import CreateStudent from "../../pages/admin/UserCreateManagement/Student/CreateStudent";
import StudentData from "../../pages/admin/UserCreateManagement/Student/StudentData";
import StudentDetails from "../../pages/admin/UserCreateManagement/Student/StudentDetails";

export const adminPaths = [
  {
    name: "Admin Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semesters",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semesters",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Student Data",
        path: "student-data",
        element: <StudentData />,
      },
      // Dynamic Routes
      {
        path: "student-data/:studentId",
        element: <StudentDetails />,
      },
    ],
  },

  {
    name: "Course Management",
    children: [
      {
        name: "Semester-registration",
        path: "semester-registration",
        element: <SemesterRegistration />,
      },
      {
        name: "Registered-semester",
        path: "registered-semester",
        element: <RegisteredSemester />,
      },
      {
        name: "Create-Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "All-Courses",
        path: "all-courses",
        element: <AllCourses />,
      },
      {
        name: "Offered-Course",
        path: "offered-course",
        element: <CreateOfferedCourse />,
      },
    ],
  },
];

import FacultyDashboard from "../../pages/faculty/FacultyDashboard";
import FacultyOfferedCourse from "../../pages/faculty/FacultyOfferedCourse";

export const facultyPaths = [
  {
    name: "faculty Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "Faculty Management",
    children: [
      {
        name: "Offered Course",
        path: "offered-course",
        element: <FacultyOfferedCourse />,
      },
    ],
  },
];

import { ADMIN } from "../utils/constants";
export const sidebarLinks = [
  
  {
    id: 1,
    name: "My Exams",
    path: "/dashboard/my-exams",
    type: ADMIN.ADMIN,
    icon: "TfiPencilAlt",
    
  },
  {
    id: 2,
    name: "Add Exam",
    path: "/dashboard/add-exam",
    type: ADMIN.ADMIN,
    icon: "MdNoteAdd",
  },
  {
    id: 3,
    name: "Add Student",
    path: "/dashboard/add-student",
    type: ADMIN.ADMIN,
    icon: "MdGroupAdd",
  },
  {
    id: 4,
    name: "Student Progress",
    path: "/dashboard/student-progress",
    type: ADMIN.ADMIN,
    icon: "BsGraphUpArrow",
  },
  {
    id: 5,
    name: "Paper History",
    path: "/dashboard/paper-history",
    type: ADMIN.ADMIN,
    icon: "VscHistory",
  },
  

  {
    id: 6,
    name: "Home",
    path: "/dashboard/student-home",
    type: ADMIN.STUDENT,
    icon: "VscHome",
  },

  {
    id: 7,
    name: "All Exams",
    path: "/dashboard/all-exams",
    type: ADMIN.STUDENT,
    icon: "GiNotebook",
  },
  {
    id: 8,
    name: "My Progres",
    path: "/dashboard/my-progress",
    type: ADMIN.STUDENT,
    icon: "GiProgression",
  },
];

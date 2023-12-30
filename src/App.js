import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login"
import Error from "./pages/Error"

import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import MyProfile from "./components/core/DashboardPage/MyProfile";
import Settings from "./components/core/DashboardPage/Settings";
import Cart from "./components/core/CartPage/index"
import AddExam from "./components/core/DashboardPage/AddExam";
import { useDispatch , useSelector} from "react-redux";


import { ADMIN } from "./utils/constants";
import MyExams from "./components/core/DashboardPage/MyExams";
import ViewPage from "./pages/ViewPage";
import StudentProgress from "./components/core/DashboardPage/StudentProgress";
import Institute from "./pages/Institute";
import AddStudent from "./components/core/DashboardPage/AddStudent";
import EditExam from "./components/core/DashboardPage/EditExam";
import EditPaper from "./components/core/DashboardPage/EditExam/EditPaper";
import StudentHome from "./components/core/DashboardPage/StudentHome";
import PaperDetails from "./components/core/ViewPaper/PaperDetails";
import Result from "./pages/Result";
import MyProgress from "./components/core/DashboardPage/MyProgress";
import PaperHistory from "./components/core/DashboardPage/PaperHistory";
import Progress from "./components/core/DashboardPage/StudentsProgress/Progress"
import AllExams from "./components/core/DashboardPage/AllExams";
import Navbar from "./components/comman/Navbar"
function App() {

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  
  
  const { user } = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex-col font-inter">

  
    <Navbar/>
   

    <Routes>
   <Route path="/" element={<Login/>}/>  

  
      
   <Route element={
    <PrivateRoute>
    <Institute/>
    </PrivateRoute>
   }>
   {
      user?.email===ADMIN.EMAIL &&
      
      <Route path="institute" element={<Institute/>}/>
     }

   </Route>
   
  

   
        
        {/* private dashboard route for only logged in users  */}
        <Route element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }>
               
               <Route path="dashboard/settings" element={<Settings/>}/> 
                {
                 user?.email!==ADMIN.EMAIL && (
                  <>
                  {/* route for only student  */}
                  <Route path="dashboard/student-home" element={<StudentHome/>}/>   
                  <Route path="dashboard/my-progress" element={<MyProgress/>}/>   
                  <Route path="/dashboard/all-exams" element={<AllExams/>}/>
                  <Route path="dashboard/cart" element={<Cart/>}/>

                  </>
                )
                }
                
                {
                user?.email === ADMIN.EMAIL && (
                  <>
                  {/* route for only student  */}
                  <Route path="dashboard/add-exam" element={<AddExam/>}/>
                  <Route path="dashboard/add-student" element={<AddStudent/>}/>
                  <Route path="dashboard/student-progress" element={<StudentProgress />} />
                  <Route path="dashboard/paper-history" element={<PaperHistory/>}/>
                  <Route path="dashboard/my-exams" element={<MyExams/>}/>
                  <Route path="dashboard/edit-exam/:examId" element={<EditExam/>}/>
                  <Route path="dashboard/edit-paper/:paperId/:examId" element={<EditPaper/>}/>
                  <Route path="dashboard/see-progress/:studentId" element={<Progress/>}/>

                  
                  </>
                )
                }

        
        </Route>







       <Route
       element={
        <PrivateRoute>
          <ViewPage/>
        </PrivateRoute>
       }
       >
       { user?.email!==ADMIN.EMAIL  &&(
        <>
          <Route 
            path="view-paper/:paperId/question/:questionId" 
            element={<PaperDetails/>}
          />
         
        </>
       )}
      
       </Route>

       <Route
       element={
        <PrivateRoute>
          <Result/>
        </PrivateRoute>
       }
       >
       { user?.email!==ADMIN.EMAIL  &&(
        <>
        <Route path="/result/:paperId" element={<Result/>}/>

        </>
       )}
      
       </Route>


        <Route path="*" element={<Error/>}/>
    </Routes>

    </div>
  );
}

export default App;

import { BrowserRouter , Routes , Route } from "react-router-dom"
import Header from "./Components/Header";
import Register from "./Components/Register";
import Log_in from "./Components/Log_in";
import Home from "./Components/Home";
import AdminLogin from "./Adminpage/AdminLogin";
import AdminHome from "./Adminpage/AdminHome";
import Html from "./Adminpage/Html";
import HtmlCourse from "./Components/Course/HtmlCourse";
import AddQuiz from "./Adminpage/AddQuiz";
function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/login" element={ <Log_in/> }/>
          <Route path="/register" element={ <Register />} />

          {/*For Admin  */}
          <Route path="/admin" element={ <AdminLogin />} />
          <Route path="/admin/home" element={ <AdminHome />} />
          <Route path="/admin/home/:name" element={ <Html />} />
          <Route path="/admin/home/addquiz" element={ <AddQuiz />} /> 

          {/*Course */}
          <Route path="/learncourse/:coueseName" element={ <HtmlCourse/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

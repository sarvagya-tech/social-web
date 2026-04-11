import{Route,Routes} from "react-router-dom"
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogList from "./components/BlogList";
import About from "./components/About";


function App() {
  return (
    
    <div className="min-h-screen bg-slate-950 text-white">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/create" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element = {<Register/>}/>
        <Route path="/about" element ={<About/>}   /> 
        </Routes>

       {/* next we have to work on the comment and like part  */}



      
    </div>
    
  );
}

export default App;

import NavBar from "./components/NavBar";
import Header from "./components/Header";
import BlogList from "./components/blogList";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import{Route,Routes} from "react-router-dom"
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";


function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/create" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/blog/" element = {<BlogList/>}/>
      </Routes>



      
    </div>
  );
}

export default App;

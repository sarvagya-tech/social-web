import { useNavigate } from "react-router-dom";
import { useAuth } from "../service/Authcontext";
function Header() {
  const navigate = useNavigate();
  const {user} = useAuth();
  

  const handleExplore = () => {
    navigate('/blog');
  }
  const handleStart = ()=>{
    if(!user){
      navigate('/register');
    }
    else{
        navigate('/blog/create');
    }
    
  }
  return (
    <header className="relative overflow-hidden px-4 pb-12 pt-16 sm:px-8 sm:pt-20">
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-6 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
            Independent Blog Magazine
          </p>
          <h1 className="text-5xl font-black leading-tight text-white [font-family:'Playfair_Display',serif] sm:text-6xl">
            Stories that sharpen your craft and widen your view
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
            A modern editorial space for design, technology, productivity, and
            creative living. Clean visuals, bold ideas, and readable content.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button 
            onClick={handleStart}
            
            className="rounded-full bg-amber-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-slate-950 transition hover:bg-amber-300">
              Get started
            </button>
            <button 
            onClick={handleExplore}
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:border-amber-300/40 hover:text-amber-100">
              Explore Articles
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-300/20 to-cyan-300/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-4 backdrop-blur-sm">
            <img
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80"
              alt="Writing desk with notebook and coffee"
              className="h-[440px] w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

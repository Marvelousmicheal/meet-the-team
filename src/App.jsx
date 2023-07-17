import { useState ,useEffect, useRef} from "react";
import { persons } from "../data";
function App() {
  const [activeItem, setactiveItem] = useState(4);
 const wrapperRef = useRef(null);
 const timeoutRef = useRef(null)

 useEffect(() => {
  if(!wrapperRef.current) return
  if(timeoutRef.current){
    clearTimeout(timeoutRef.current)
  }
   wrapperRef.current.style.setProperty(
      "--transition",
      "600ms cubic-bezier(0.22, 0.61, 0.36, 1)"
    
   )
   timeoutRef.current = setTimeout(() => {
     wrapperRef.current.style.removeProperty("--transition");
   }, 900);

   return()=>{
    if(timeoutRef.current){
      clearTimeout(timeoutRef.current)
    }
   }
 }, [activeItem]);
  return (
    <>
      <h1 className="font-extrabold capitalize text-center text-5xl pt-9">
        Meet the team
      </h1>
      <p className="text-center text-2xl my-9">
        we are delighted to show you the people that are putting in the work
        behind the screen
      </p>
      <div className="flex  w-full items-center justify-center">
        <div className="w-[90%] max-w-full">
          <ul ref={wrapperRef} className="flex gap-[1.5%]  group h-[640px]">
            {persons.map((person, index) => (
              <li
                onClick={() => setactiveItem(index)}
                key={person.name}
                className="w-[8%] relative rounded-2xl [&[aria-current='true']]:w-[48%]  hover:w-[12%]  
               [transition:width_var(--transition,200ms_ease-in)]
                [&:not(:hover),&:not(:first),&:not(:last)]:group-hover:w-[7%] before:bg-transparent before:left-[-10px] before:bottom-0 before:top-0 before:right-[-10px] before:absolute"
                aria-current={activeItem === index}
              >
                <div className=" relative w-full h-full overflow-hidden rounded-xl">
                  <img
                    src={person.image}
                    alt={person.name}
                    className={`${
                      activeItem === index ? "" : "grayscale"
                    } w-full h-full object-cover absolute top-0 left-0 `}
                  />
                  <div className={`left-8 top-8 w-[590px] p-4 transition-[transform,opacity] md:absolute md:p-0 ${
                      activeItem === index ? "block" : "hidden"}`}>
                    <p className="text-sm uppercase text-primary md:text-lg text-white">
                      {person.title}
                    </p>
                    <p className="text-lg font-bold md:text-4xl text-white">
                      {person.name}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;

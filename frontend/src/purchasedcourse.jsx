import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Navigate,useNavigate } from "react-router-dom";
export const Alreadypurchased = () => {
  const [oldupdate, newupdate] = useState(true);
  const [oldarray, newarray] = useState([]); // purchased
  const [wholeoldarray, narray] = useState([]); // all courses
  const [actual, newa] = useState([]); // purchased full details
    const navigate=useNavigate()
  // Fetch purchased courses
  const perfect = async () => {
    try {
      const data = await fetch("http://localhost:9001/home/purchasedcour", {
        method: "GET",
        headers: { "content-type": "application/json" },
      });

      if (data.ok) {
        const response = await data.json();
        newarray(response.details); // array of purchased {courseId}
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all courses
  const takingwholecourses = async () => {
    try {
      const data = await fetch("http://localhost:9001/home/service", {
        method: "GET",
        headers: { "content-type": "application/json" },
      });

      if (data.ok) {
        const response = await data.json();
        narray(response.details); // all courses
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Match purchased IDs with full course details
  const Finalize = () => {
    if (oldarray.length > 0 && wholeoldarray.length > 0) {
      const purchasedDetails = wholeoldarray.filter(course =>
        oldarray.some(p => p.courseId === course._id)
      );
      newa(purchasedDetails);
    }
  };

  // Fetch both purchased + all courses
  useEffect(() => {
    const fetchData = async () => {
      await perfect();
      await takingwholecourses();
    };
    fetchData();
  }, []);

  // Run finalize whenever data changes
  useEffect(() => {
    Finalize();
  }, [oldarray, wholeoldarray]);
const seedtails=(id)=>{
  navigate(`/individual/${id}`)
}
  return (
    <>
      <Navbar value={newupdate} value2={oldupdate} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">
          Purchased Courses:
        </h1>

        <div className="space-y-6">
          {actual?.map((curr) => (
            <div
              key={curr._id}
              className="bg-gray-800 text-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-6"
            >
              {/* Image */}
              <div className="w-full md:w-1/3 flex justify-center">
                <img
                  src={curr.image}
                  alt={curr.service}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              {/* Text Details */}
              <div className="w-full md:w-2/3 flex flex-col justify-center">
                <h2 className="text-xl font-semibold">{curr.service}</h2>
                <p className="text-gray-300 mt-2">{curr.description}</p>
                <p className="text-green-400 font-bold mt-3">₹{curr.price}</p>
                <button onClick={()=>seedtails(curr._id)}>See Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

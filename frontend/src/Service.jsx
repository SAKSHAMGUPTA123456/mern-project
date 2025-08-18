import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
const Service = () => {
  const [oldupdate, newupdate] = useState(true);
  const [courses, setCourses] = useState([]);
const [token,newtoken]=useState(localStorage.getItem('token'))
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(false); 

  const coursesURI = "https://mern-project-tv78.onrender.com/home/service";
  const purchasedURI = "https://mern-project-tv78.onrender.com/home/purchasedcour";

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await fetch(coursesURI, { method: "GET", credentials: "include" });
      const data = await res.json();
      setCourses(data.details || []);
    } catch (err) {
      console.error(err);
      alert("Error fetching courses");
    }
  };

  // Fetch purchased courses
const fetchPurchasedCourses = async () => {
  try {
    const res = await fetch(purchasedURI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // send token here
      }
    });
    const data = await res.json();
    console.log(data);
    setPurchasedCourses(data.details || []);
  } catch (err) {
    console.error(err);
  }
};
const checkinguserin=()=>{
if(!token){
  alert('please login first to purchase courses')
  navigate('/login')
}
}
  useEffect(() => {
    fetchCourses();
    fetchPurchasedCourses();
    checkinguserin()
  }, []);

  // Load Razorpay SDK dynamically
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  // Handle Buy button
  const handleBuy = async (course) => {
  for(let i=0;i<purchasedCourses.length;i++){
    if(purchasedCourses[i].courseId==course._id){
      alert('you had already purchased course')
      return;
    }
  }

    setLoading(true);

    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    try {
      // Create order on backend
      const orderRes = await fetch("https://mern-project-tv78.onrender.com/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course._id }),
      });
      const orderData = await orderRes.json();

      // Razorpay options
      const options = {
        key: "rzp_test_R65lJ9poc06w6e",
        amount: orderData.amount,
        currency: "INR",
        name: course.service,
        description: course.description,
        order_id: orderData.id,
        handler: async function (response) {
          await fetch("https://mern-project-tv78.onrender.com/payment/payment-success", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
             "Authorization": `Bearer ${token}`,
            body: JSON.stringify({ ...response, courseId: course._id }),
          });
          alert(`Payment successful for ${course.service}`);
          setPurchasedCourses((prev) => [...prev, { courseId: course._id }]);
        },
        prefill: { name: "John Doe", email: "john@example.com" },
        theme: { color: "#1877F2" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
  const navigate=useNavigate()
const handlingpurchasing=()=>{
navigate('/alreadypurchased')
}

  return (
    <>
      <Navbar value={newupdate} value2={oldupdate} />

      <div className="flex justify-between mt-8">
        <div></div>
        <div>
          <h1
            style={{
              color: "white",
              fontSize: "55px",
              textDecoration: "underline",
              textDecorationColor: "#1877F2",
            }}
          >
            Services
          </h1>
        </div>
        <div>
          <button
            className="bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            
            onClick={handlingpurchasing}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          
            Purchased Courses
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses?.map((course) => (
            <div key={course._id} style={{ border: "2px solid white" }} className="mb-11 md:w-[400px] p-4">
              <div className="flex justify-center">
                <img src="design.png" alt="course" style={{ height: "340px" }} />
              </div>

              <div className="flex justify-between mt-2 mb-2">
                <h3 style={{ color: "white" }}>Tech Solutions Inc</h3>
                <h3 style={{ color: "white" }}>₹{course.price}</h3>
              </div>

              <div style={{ color: "white", fontSize: "40px" }}>{course.service}</div>

              <div className="flex justify-center mt-2 mb-2">
                <h4 style={{ color: "white" }}>{course.description}</h4>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handleBuy(course)}
                  className={`font-semibold py-2 px-4 rounded ${
                    purchasedCourses.some((c) => c._id === course._id)
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-500 text-white"
                  }`}
                >
              {purchasedCourses.some(curr => curr.courseId === course._id) ? "Purchased" : "Buy now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Service;

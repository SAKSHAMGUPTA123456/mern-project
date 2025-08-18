const { createContext, useContext, useState, useEffect,useCallback } = require("react");

const Authcontent = createContext();

export const Authprovider = ({ children }) => {
  const [oldtoken, newtoken] = useState(localStorage.getItem("token") || "");
  const [oldauthen, newauthenti] = useState({});
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  const storetoken = (valuing) => {
    localStorage.setItem("token", valuing);
    newtoken(valuing);
  };

  const logout = () => {
    localStorage.removeItem("token");
    newtoken("");
  };

  const updating = !!oldtoken;
  const userauthentication = useCallback(async () => {
    try {
      const response = await fetch("https://mern-project-backend-c97u.onrender.com/home/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${oldtoken}`,
        },
      });
      if (response.ok) {
        const gh = await response.json();
        newauthenti(gh);
      } else {
        newauthenti({});
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      newauthenti({});
    } finally {
      setLoading(false); // ✅ Done loading regardless of success/failure
    }
  },[oldtoken])

  useEffect(() => {
    setLoading(true);           // ✅ Reset loading before fetch
    userauthentication();
  }, [userauthentication,oldtoken]);

  return (
    <Authcontent.Provider
      value={{ storetoken, updating, logout, oldauthen, loading,oldtoken }} // ✅ Include loading
    >
      {children}
    </Authcontent.Provider>
  );
};

export const Useauth = () => {
  return useContext(Authcontent);
};

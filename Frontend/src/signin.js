// import { useNavigate } from "react-router-dom";
// export const onSignin = async (setIsLoggedIn) => {
//     try {
//         const res = await fetch("http://localhost:3000/login", { credentials: "include" });
//         const data = await res.json();
//         setIsLoggedIn(data.loggedin); // Updates React state
//         console.log(data.loggedin)
//     } catch (error) {
//       setIsLoggedIn(false);
//     }
//   };
// export const onSignin = (setIsLoggedIn) =>{
//     fetch("http://localhost:3000/test")
// }

export const onSignin = async (formData, navigate) => {
    // const navigate = useNavigate();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await response.json();
  
      if (data.success) {
        
        navigate('/app');  // ✅ Redirect user in React
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

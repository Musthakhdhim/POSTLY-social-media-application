import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Authentication from "./auth/Authentication";
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from './store/Auth/Action';
import { useEffect } from 'react';
import Verify from './auth/Verify';

function App() {
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt && !auth.user) {
      dispatch(getUserProfile());
    }
  }, [jwt, auth.user, dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={auth.user ? <HomePage /> : <Authentication />} />
        
        <Route path="/verify" element={<Verify />} /> 

      </Routes>
    </div>
  );
}

export default App;









































































































































































// import './App.css';
// import { Route, Routes, useNavigate } from "react-router-dom";
// import HomePage from "./components/HomePage";
// import Authentication from "./auth/Authentication";
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserProfile } from './store/Auth/Action';
// import { useEffect } from 'react';

// function App() {

//   const jwt=localStorage.getItem("jwt")
//   const {auth}=useSelector(store=>store)
//   const dispatch=useDispatch()
//   const navigate=useNavigate()
  
//   useEffect(()=>{
//     if(jwt){
//       dispatch(getUserProfile(jwt))
//       navigate("/")
//     }
//   },[auth.jwt])

//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/*" element={auth.user?<HomePage/>:<Authentication/>}></Route>
//       </Routes>
//     </div>
//   );
// }

// export default App;

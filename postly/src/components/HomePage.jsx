import { Grid } from "@mui/material";
import Middle from "../HomeSection/Middle.jsx";
import RightSection from "../HomeSection/RightSection.jsx";
import Navigation from "../navigation/Navigation.jsx";
import { Route, Routes } from "react-router-dom";
import Profile from "../subpages/Profile.jsx";
import PostDetails from "../PostDetails/PostDetails.jsx";


// export default function HomePage() {
//   return (
//     <Grid container className="px-5 lg:px-36 justify-between">
//       {/* Left Section */}
//       <Grid item lg={3} className="hidden lg:block w-full relative">
//         <Navigation />
//       </Grid>

//       {/* Middle Section */}
//       <Grid item xs={12} lg={6} className="w-full relative px-5 lg:px-9">
//         <Middle />
//       </Grid>

//       {/* Right Section */}
//       <Grid item lg={3} className="hidden lg:block w-full relative">
//         <RightSection />
//       </Grid>
//     </Grid>
//   );
// }

export default function HomePage() {
  return (
    <div className="px-5 lg:px-36 flex justify-between">
      {/* Left Column */}
      <div className="hidden lg:block w-2/12 relative">
        <Navigation/>
      </div>

      {/* Middle Column */}
      <div className="px-5 lg:px-9 w-full lg:w-6/12 relative">

        <Routes>
          <Route path="/" element={<Middle/>}></Route>
          <Route path="/home" element={<Middle/>}></Route>
          <Route path="/profile/:id" element={<Profile/>}></Route>
          <Route path="/post/:id" element={<PostDetails/>}></Route>
        </Routes>
        
      </div>

      {/* Right Column */}
      <div className="hidden lg:block w-3/12 relative">
        <RightSection/>
      </div>
    </div>
  );
}
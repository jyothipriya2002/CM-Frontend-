// // import { useState } from 'react'


// // import ParentRegistration from './ParentRegistration'
// // import LoginForm from './LoginForm'

// // function App() {
  

// //   return (
// //     <>
// //      <ParentRegistration/>
// //      <LoginForm/>
// //     </>
// //   )
// // }

// // export default App
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ParentRegistration from "./ParentRegistration";
// import LoginForm from "./LoginForm";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginForm />} />
//         <Route path="/register" element={<ParentRegistration />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ParentRegistration from "./ParentRegistration";
import LoginForm from "./LoginForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<ParentRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;




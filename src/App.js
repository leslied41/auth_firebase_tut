import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Slider from "./pages/Slider";
import ForgetPassword from "./pages/ForgetPassword";
import UpdateProfile from "./pages/UpdateProfile";
import PrivateOutlet from "./components/PrivateOutlet";
import { AuthProvider } from "./components/contexts/AuthProvider";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

function App() {
  const logged = localStorage.getItem("logged");
  const [loginStatus, setLoginStatus] = useState(false);
  //this is to set a usestate and pass them to login page, so when logged, loginStatus can be
  //changed and this app component can be rerendered. so the logged from localstorage can be
  //refreshed. And then the conditional router below can  work.

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              exact
              path="/"
              element={
                !logged ? <Navigate replace to="/signin" /> : <Dashboard />
              }
            />
            {/* 所以这个方法判断时候要用logged，而它是我通过在login页面login成功以后，setitem到localstorage的。
            之所以这么做，是因为useAuth不可以用在App.js，因为它是在AuthProvider中，而AuthProvider并不会给App.js提供
            数据。但这是方法一来实现，根据用户是否登陆来给用户权限登陆不同页面。
             */}
            {/* 方法二是通过privated route。 */}
            {/* 如果用户已登陆，那么就会进入dashboard页面，否则会进入signin页面。 */}
            {/* <Route exact path="/" element={<Dashboard />} /> */}

            <Route path="/signup" element={<Signup />} />
            <Route
              path="/signin"
              element={
                <Signin
                  setLoginStatus={setLoginStatus}
                  loginStatus={loginStatus}
                />
              }
            />
            <Route path="/slider" element={<Slider />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/updateprofile" element={<PrivateOutlet />}>
              <Route path="" element={<UpdateProfile />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

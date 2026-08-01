import Navbar from "./components/Navbar.jsx"; 

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { useThemeStore } from "./store/useThemeStore";


import {Routes,Route,Navigate} from "react-router-dom";
import{useAuth} from "./store/useAuthStore.js";
import { useEffect } from "react";
import {Loader} from "lucide-react";
import { Toaster } from "react-hot-toast";
const App=()=> {
  
  const { authUser,
  checkAuth,
  isCheckingAuth} = useAuth();
    const { theme } = useThemeStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  if(isCheckingAuth && !authUser)return(
    <div className="flex items-center justify-center h-screen">
      <Loader className = "size-10 animate-spin" > 

      </Loader>

    </div>
  )
  
  
  
  return (


    <div data-theme={theme} >
<Navbar />

<Routes>
  <Route
    path="/"
    element={authUser ? <HomePage /> : <Navigate to="/login" />}
  />

  <Route
    path="/signup"
    element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
  />

  <Route
    path="/login"
    element={!authUser ? <LoginPage /> : <Navigate to="/" />}
  />

  <Route
    path="/settings"
    element={authUser ? <SettingsPage /> : <Navigate to="/login" />}
  />

  <Route
    path="/profile"
    element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
  />
</Routes>
<Toaster
  position="top-right"
  reverseOrder={false}
/>
    </div>
  );
}

export default App;
import React from 'react'
import { useState } from 'react';
const SignUpPage = () => {

  const [showPassword,setShowPassword]= useState(false);
   const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  return (
    <div className="min-h-screen grid lg:grid-cols-2"></div>
  )
}

export default SignUpPage
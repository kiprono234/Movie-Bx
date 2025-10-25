import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link,useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate=useNavigate();
  const [serverError, setServerError] = useState(""); 
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode:"onBlur"
  });

const onSubmit = async (data) => {
  setServerError("");
  try {
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    let result;
    try {
      result = await response.json();
    } catch {
      result = {};
    }

    if (!response.ok) {
      setServerError(result.error || "Invalid email or password");
      return;
    }

    console.log("✅ Login success:", result);
    localStorage.setItem("access_token", result.access_token);

    navigate("/");

  } catch (error) {
    setServerError("An unexpected error occurred. Please try again.");
    console.error("🚨 Unexpected error:", error.message);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
            {serverError && (
            <p className="text-red-500 text-center text-sm mt-2">{serverError}</p>
          )}
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

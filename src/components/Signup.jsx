import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex w-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-lg rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-10 dark:border-slate-800 dark:bg-slate-900/85 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-32">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-100">
          Sign up to create account
        </h2>
        <p className="mt-3 text-center text-sm text-slate-600 sm:text-base dark:text-slate-300">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-semibold text-amber-700 transition duration-200 hover:text-amber-800 hover:underline dark:text-amber-300 dark:hover:text-amber-200"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="mt-6 text-center text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name:"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

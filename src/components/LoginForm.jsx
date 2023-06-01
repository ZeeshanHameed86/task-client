import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const inputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const labelClass =
  "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

const LoginForm = ({ setIsLogin }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      cookies.set("tokenClient", data.token, {
        expires: new Date(new Date().setDate(new Date().getDate() + 1)),
      });
      // dispatch(setUser(data.token));
      navigate("/");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginSubmit = (data) => {
    mutate({ email: data.email, password: data.password });
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(loginSubmit)}>
      <h1 className="text-center mb-10 text-4xl">Login</h1>
      <div className="mb-5">
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          {...register("email", { required: "This is required" })}
          id="email"
          className={inputClass}
          placeholder="Email"
        />
        <p>{errors?.email?.message}</p>
      </div>
      <div className="mb-5">
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          {...register("password", { required: "This is required" })}
          id="password"
          className={inputClass}
          placeholder="Password"
        />
        <p>{errors?.password?.message}</p>
      </div>
      <div className="flex justify-center items-center flex-col">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
        >
          Submit
        </button>
        <p className="mt-2">
          Don't have an account,{" "}
          <span
            onClick={() => setIsLogin(false)}
            className="text-blue-500 cursor-pointer"
          >
            signup
          </span>{" "}
          here
        </p>
      </div>
    </form>
  );
};

export default LoginForm;

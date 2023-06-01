import React from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../api";
import { useMutation } from "@tanstack/react-query";

const inputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const labelClass =
  "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

const RegisterForm = ({ setIsLogin }) => {
  const { mutate } = useMutation({
    mutationFn: registerUser,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerSubmit = (data) => {
    mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
    setIsLogin(true);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(registerSubmit)}>
      <h1 className="text-center mb-10 text-4xl">Register</h1>
      <div className="mb-5">
        <label htmlFor="firstname" className={labelClass}>
          First Name
        </label>
        <input
          {...register("firstName", { required: true })}
          id="firstname"
          className={inputClass}
          placeholder="First Name"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="lastName" className={labelClass}>
          Last Name
        </label>
        <input
          {...register("lastName", { required: true })}
          id="lastName"
          className={inputClass}
          placeholder="Last Name"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          {...register("email", { required: true })}
          id="email"
          className={inputClass}
          placeholder="Email"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          {...register("password", { required: true })}
          id="password"
          className={inputClass}
          placeholder="Password"
        />
      </div>
      <div className="flex justify-center items-center flex-col">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
        >
          Submit
        </button>
        <p className="mt-2">
          Already have an account,{" "}
          <span
            onClick={() => setIsLogin(true)}
            className="text-blue-500 cursor-pointer"
          >
            Login
          </span>{" "}
          here
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;

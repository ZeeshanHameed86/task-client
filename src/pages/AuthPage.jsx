import React, { useState } from "react";
import { LoginForm, RegisterForm } from "../components";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="flex justify-center items-center mx-auto px-10 md:w-1/2 lg:w-1/3"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      {isLogin ? (
        <LoginForm setIsLogin={setIsLogin} />
      ) : (
        <RegisterForm setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default AuthPage;

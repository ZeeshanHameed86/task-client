import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const HomePage = () => {
  const cookies = new Cookies();
  return (
    <main
      className="flex justify-center items-center"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      {cookies.get("tokenClient") ? (
        <h1 className="text-3xl">
          Add/access your books{" "}
          <span>
            <Link to="/books" className="text-blue-500">
              here
            </Link>
          </span>{" "}
        </h1>
      ) : (
        <h1 className="text-3xl">
          Please{" "}
          <span>
            <Link to="/auth">login</Link>
          </span>{" "}
          to add/access books
        </h1>
      )}
    </main>
  );
};

export default HomePage;

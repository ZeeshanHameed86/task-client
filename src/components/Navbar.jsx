import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteAccount, logout } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "universal-cookie";

const Navbar = () => {
  const queryClient = useQueryClient();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { mutate: mutateLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries("books");
      cookies.remove("tokenClient");
      // dispatch(logoutUser());
      navigate("/");
    },
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      cookies.remove("tokenClient");
    },
  });

  return (
    <nav
      className="px-5 shadow-md flex justify-between items-center"
      style={{ height: "4rem" }}
    >
      <h1 className="text-2xl">
        <Link to="/">BitBytes</Link>
      </h1>
      <div className="flex" style={{ gap: "1rem" }}>
        <Link className="text-xl" to="/books">
          Books
        </Link>
        {cookies.get("tokenClient") ? (
          <>
            <button className="text-xl" onClick={mutateLogout}>
              Logout
            </button>
            <button
              className="text-xl"
              onClick={() => {
                mutateDelete();
                mutateLogout();
              }}
            >
              Delete Account
            </button>
          </>
        ) : (
          <Link className="text-xl" to="/auth">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

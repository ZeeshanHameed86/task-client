import React, { useState } from "react";
import cover from "../assets/full-cover.jpg";
import { AiOutlineMenu } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookCategory } from "../api";

const BookCard = ({ item }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateBookCategory,
    onSuccess: () => {
      queryClient.invalidateQueries("books");
    },
  });
  const [isMenu, setIsMenu] = useState(false);

  return (
    <div className="text-center shadow-lg">
      <div className="relative">
        <div
          className="absolute top-2 left-2 z-50 text-lg bg-white rounded-full p-1 cursor-pointer"
          onClick={() => setIsMenu(!isMenu)}
        >
          <AiOutlineMenu />
        </div>
        {isMenu && (
          <div className="text-start absolute bg-white left-2 top-10 rounded p-1">
            {item.category != "plan-to-read" && (
              <h1
                className="cursor-pointer hover:bg-gray-500 rounded p-0.5"
                onClick={() => {
                  setIsMenu(false);
                  mutate({ id: item._id, category: "plan-to-read" });
                }}
              >
                Plan To Read
              </h1>
            )}
            {item.category != "reading" && (
              <h1
                className="cursor-pointer hover:bg-gray-500 rounded p-0.5"
                onClick={() => {
                  setIsMenu(false);
                  mutate({ id: item._id, category: "reading" });
                }}
              >
                Reading
              </h1>
            )}
            {item.category != "completed" && (
              <h1
                className="cursor-pointer hover:bg-gray-500 rounded p-0.5"
                onClick={() => {
                  setIsMenu(false);
                  mutate({ id: item._id, category: "completed" });
                }}
              >
                Completed
              </h1>
            )}
          </div>
        )}
        <img src={cover} alt="" className="w-48" />
      </div>
      <h1>{item.genre}</h1>
      <h1>{item.authorName}</h1>
    </div>
  );
};

export default BookCard;

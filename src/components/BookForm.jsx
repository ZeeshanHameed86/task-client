import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { addBook } from "../api";

const inputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const labelClass =
  "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

const BookForm = ({ setIsAddBook }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries("books");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleBookSubmit = (data) => {
    mutate({
      title: data.title,
      authorName: data.authorName,
      publicationHouse: data.publicationHouse,
      publicationDate: data.publicationDate,
      publicationYear: data.publicationYear,
      genre: data.genre,
    });
    setIsAddBook(false);
  };

  return (
    <section className="md:w-1/2 lg:1/3 m-auto">
      <form onSubmit={handleSubmit(handleBookSubmit)}>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="mb-5 w-full">
            <label htmlFor="title" className={labelClass}>
              Title
            </label>
            <input
              {...register("title", { required: "This is required" })}
              id="title"
              className={inputClass}
              placeholder="Title"
            />
            <p>{errors?.title?.message}</p>
          </div>
          <div className="mb-5 w-full">
            <label htmlFor="authorName" className={labelClass}>
              Author Name
            </label>
            <input
              {...register("authorName", { required: "This is required" })}
              id="authorName"
              className={inputClass}
              placeholder="Author Name"
            />
            <p>{errors?.authorName?.message}</p>
          </div>

          <div className="mb-5 w-full">
            <label htmlFor="publicationHouse" className={labelClass}>
              Publication House
            </label>
            <input
              {...register("publicationHouse", {
                required: "This is required",
              })}
              id="publicationHouse"
              className={inputClass}
              placeholder="Publication House"
            />
            <p>{errors?.publicationHouse?.message}</p>
          </div>
          <div className="mb-5 w-full">
            <label htmlFor="publicationDate" className={labelClass}>
              Publication Date
            </label>
            <input
              {...register("publicationDate", { required: "This is required" })}
              id="publicationDate"
              className={inputClass}
              placeholder="Publication Date"
            />
            <p>{errors?.publicationDate?.message}</p>
          </div>
          <div className="mb-5 w-full">
            <label htmlFor="publicationYear" className={labelClass}>
              Publication Year
            </label>
            <input
              {...register("publicationYear", { required: "This is required" })}
              id="publicationYear"
              className={inputClass}
              placeholder="Publication Year"
            />
            <p>{errors?.publicationYear?.message}</p>
          </div>
          <div className="mb-5 w-full">
            <label htmlFor="genre" className={labelClass}>
              Genre
            </label>
            <input
              {...register("genre", { required: "This is required" })}
              id="genre"
              className={inputClass}
              placeholder="Genre"
            />
            <p>{errors?.genre?.message}</p>
          </div>
        </div>
        <div className="flex justify-center mb-10">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default BookForm;

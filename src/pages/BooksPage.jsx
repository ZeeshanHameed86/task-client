import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BookCard, BookForm } from "../components";
import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../api";

const inputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const labelClass =
  "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
const selectClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const BooksPage = () => {
  const [search, setSearch] = useState("");
  const [sortByAuthors, setSortByAuthors] = useState("all");
  const [authors, setAuthors] = useState([]);
  const { data } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
    staleTime: 120000,
    onSuccess: (data) => {
      setAuthors(data.map((item) => item.authorName));
    },
    select: (data) => {
      const tempData = data.books.filter((item) => {
        return search.toUpperCase() === ""
          ? item
          : String(item.title).toLowerCase().includes(search.toLowerCase());
      });
      const temp = tempData.filter((item) => {
        return sortByAuthors === "all"
          ? item
          : item.authorName === sortByAuthors;
      });
      return temp;
    },
  });
  const [isAddBook, setIsAddBook] = useState(false);

  return (
    <section className="px-10">
      <div className="grid md:grid-cols-2 md:w-1/2 lg:w-1/3 m-auto mt-10 gap-5">
        <div className="mb-5">
          <label htmlFor="search" className={labelClass}>
            Search
          </label>
          <input
            id="search"
            className={inputClass}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="sort" className={labelClass}>
            Sort by author
          </label>
          <select
            defaultValue="all"
            className={selectClass}
            name="sort"
            id="sort"
            onChange={(e) => setSortByAuthors(e.target.value)}
          >
            <option value="all">All authors</option>
            {authors != [] &&
              [...new Set(authors)].map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      <div>
        <h1 className="text-center text-4xl mt-10">Plan To Read</h1>
        <div className="flex justify-center gap-10 mt-5 flex-wrap">
          {data
            ?.filter((item) => item.category === "plan-to-read")
            .map((item) => {
              return <BookCard item={item} key={item._id} />;
            })}
        </div>
      </div>
      <div>
        <h1 className="text-center text-4xl mt-10">Reading</h1>
        <div className="flex justify-center gap-10 mt-5 flex-wrap">
          {data
            ?.filter((item) => item.category === "reading")
            .map((item) => {
              return <BookCard item={item} key={item._id} />;
            })}
        </div>
      </div>
      <div>
        <h1 className="text-center text-4xl mt-10">Completed</h1>
        <div className="flex justify-center gap-10 mt-5 flex-wrap">
          {data
            ?.filter((item) => item.category === "completed")
            .map((item) => {
              return <BookCard item={item} key={item._id} />;
            })}
        </div>
      </div>
      <div
        className="flex justify-end items-center my-10 cursor-pointer "
        onClick={() => setIsAddBook(true)}
      >
        <h1 className="text-xl mr-1 ">Add Book</h1>
        <AiOutlinePlus />
      </div>
      {isAddBook && <BookForm setIsAddBook={setIsAddBook} />}
    </section>
  );
};

export default BooksPage;

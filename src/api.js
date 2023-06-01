import axios from "axios";

export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  const { data } = await axios.post(
    "https://task-server-omega.vercel.app/auth/register",
    {
      firstName,
      lastName,
      email,
      password,
    },
    { withCredentials: true }
  );
  return data;
};

export const login = async ({ email, password }) => {
  try {
    const { data } = await axios.post(
      "https://task-server-omega.vercel.app/auth/login",
      { email, password },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const logout = async () => {
  await axios.get("https://task-server-omega.vercel.app/auth/logout", {
    withCredentials: true,
  });
};

export const deleteAccount = async () => {
  await axios.get("https://task-server-omega.vercel.app/auth/delete", {
    withCredentials: true,
  });
};

export const addBook = async ({
  title,
  authorName,
  publicationHouse,
  publicationDate,
  publicationYear,
  genre,
}) => {
  const { data } = await axios.post(
    "https://task-server-omega.vercel.app/book/add",
    {
      title,
      authorName,
      publicationHouse,
      publicationDate,
      publicationYear,
      genre,
    },
    { withCredentials: true }
  );
  return data;
};

export const getBooks = async () => {
  try {
    const { data } = await axios.get(
      "https://task-server-omega.vercel.app/book/get",
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const updateBookCategory = async ({ id, category }) => {
  try {
    const { data } = await axios.patch(
      "https://task-server-omega.vercel.app/book/update",
      { id, category },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

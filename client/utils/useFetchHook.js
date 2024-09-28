import React, { useEffect } from "react";
import axiosInstance from "../apiBackend";
import { useSelector } from "react-redux";

const useFetchHook = ({ url }) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);
  const { allUsers } = useSelector((state) => state.users);

  const fetch = async () => {
    console.log("pasa");
    try {
      setLoading(true);
      const response = await axiosInstance.get(url);
      console.log(response.data.usersInfo, "daaaaaaaaaaaaaaaaa");

      setData(response?.data?.usersInfo);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [url, allUsers]);

  return { data, error, loading };
};

export default useFetchHook;

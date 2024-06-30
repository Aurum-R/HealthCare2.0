import React, { useEffect } from "react";
import toast from "react-hot-toast";

const useGetUsers = () => {
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setUsers(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);
  return { loading, users };
};

export default useGetUsers;

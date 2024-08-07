import React, { useEffect } from "react";
import { IoSearchSharp, IoCloseSharp } from "react-icons/io5";
import { useState } from "react";

import useDoctorInfo from "../../zustand/useDoctorInfo";
import useGetDoctors from "../hooks/useGetDoctors";
import toast from "react-hot-toast";

const SearchDoctors = () => {
  const [search, setSearch] = useState("");
  const { setDoctorInfo } = useDoctorInfo();
  const { doctors } = useGetDoctors();

  useEffect(() => {
    setDoctorInfo(doctors);
  }, [doctors, setDoctorInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      setDoctorInfo(doctors);
      return;
    }

    let matchingDoctors = doctors.filter(
      (d) =>
        d.fullName.toLowerCase().includes(search.toLowerCase()) ||
        d.email.toLowerCase().includes(search.toLowerCase()) ||
        d.type.toLowerCase().includes(search.toLowerCase())
    );

    if (matchingDoctors.length > 0) {
      setDoctorInfo(matchingDoctors);
      setSearch("");
    } else toast.error("No such doctor found");
  };

  const handleReset = () => {
    setSearch("");
    setDoctorInfo(doctors);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <IoSearchSharp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Doctors"
          required
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="mr-7 text-white absolute end-16 bottom-2.5 bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default SearchDoctors;

"use client";

import { useEffect, useState, useMemo } from "react";

// ===== Constants ===== //
const tableHeaders = [
  "First Name",
  "Last Name",
  "City",
  "Degree",
  "Specialties",
  "Years of Experience",
  "Phone Number",
];

// ===== Interfaces ===== //
import { Advocate } from "./interfaces/Advocates";
import { Specialty } from "./interfaces/Specialty";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | Specialty>("");

  const filteredAdvocates = useMemo(() => {
    if (searchTerm) {
      return advocates.filter((advocate) => {
        const {
          firstName,
          lastName,
          city,
          degree,
          specialties,
          yearsOfExperience,
          phoneNumber,
        } = advocate;

        const formattedSpecialties = specialties?.map((specialty) =>
          specialty.toUpperCase()
        );

        const formattedSearchTerm = searchTerm.toUpperCase();

        return (
          firstName.toUpperCase().includes(formattedSearchTerm) ||
          lastName.toUpperCase().includes(formattedSearchTerm) ||
          city.toUpperCase().includes(formattedSearchTerm) ||
          degree.toUpperCase().includes(formattedSearchTerm) ||
          formattedSpecialties?.some((specialty) =>
            specialty.includes(formattedSearchTerm)
          ) ||
          yearsOfExperience?.toString()?.includes(formattedSearchTerm) ||
          phoneNumber?.toString()?.includes(formattedSearchTerm)
        );
      });
    }

    return advocates;
  }, [advocates, searchTerm]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = evt.target.value.toString();

    setSearchTerm(searchTerm);

    console.log("filtering advocates...");
  };

  const onClick = () => {
    console.log(advocates);
    setSearchTerm("");
  };

  return (
    <main className="main p-4">
      <h1 className="main-header text-4xl">Solace Advocates</h1>

      <div className="search-term-container h-100 my-4 border-2 border-gray-600 rounded-sm p-1 flex flex-row justify-start align-center">
        <p className="mr-1 flex flex-col justify-center align-center">
          Searching for:
        </p>

        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          type="text"
          onChange={onChange}
          value={searchTerm}
        />

        <button
          className="ml-2 p-2 border rounded-md bg-sky-500 hover:bg-sky-700"
          onClick={onClick}
        >
          Reset Search
        </button>
      </div>

      <table className="advocates-table w-full table-auto">
        <thead className="advocates-table-header">
          <tr>
            {tableHeaders?.map((header) => (
              <th key={header} className="text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="advocates-table-body">
          {filteredAdvocates?.map((advocate: Advocate, index: number) => {
            const {
              firstName,
              lastName,
              city,
              degree,
              specialties,
              yearsOfExperience,
              phoneNumber,
            } = advocate;

            return (
              <tr
                key={`${advocate}-${index}`}
                className="border-2 border-gray-600"
              >
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{city}</td>
                <td>{degree}</td>
                <td>
                  {specialties?.map((specialty: Specialty, index: number) => (
                    <li key={`${specialty}-${index}`}>{specialty}</li>
                  ))}
                </td>
                <td>{yearsOfExperience}</td>
                <td>{phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

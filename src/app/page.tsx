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
    <main className="p-4">
      <h1 className="text-4xl">Solace Advocates</h1>

      <div className="search-term-container h-100 my-4 border-2 border-indigo-600 rounded-sm p-1 flex flex-row justify-start align-center">
        <p className="mr-1">Searching for:</p>

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

      <table className="advocates-table table-auto">
        <thead className="advocates-table-header">
          <tr>
            {tableHeaders?.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredAdvocates?.map((advocate: Advocate, index: number) => {
            return (
              <tr key={`${advocate}-${index}`}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map(
                    (specialty: Specialty, index: number) => (
                      <div key={`${specialty}-${index}`}>{specialty}</div>
                    )
                  )}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

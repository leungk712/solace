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
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div className="search-term-container">
        <p className="search-term-header">Search</p>
        <p>Searching for:</p>
        <input type="text" value={searchTerm} />
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table className="advocates-table">
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

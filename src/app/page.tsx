"use client";

import { useEffect, useState, useMemo } from "react";

// ===== Interfaces ===== //
import { Advocate } from "./interfaces/Advocates";
import { Specialty } from "./interfaces/Specialty";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | Specialty>("");
  // const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  const filteredAdvocates = useMemo(() => {
    if (searchTerm) {
      return advocates.filter((advocate) => {
        return (
          advocate.firstName.includes(searchTerm) ||
          advocate.lastName.includes(searchTerm) ||
          advocate.city.includes(searchTerm) ||
          advocate.degree.includes(searchTerm) ||
          advocate.specialties.includes(searchTerm as Specialty) ||
          advocate.yearsOfExperience.toString()?.includes(searchTerm)
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

    document.getElementById("search-term").innerHTML = searchTerm;

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
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
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

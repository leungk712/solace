// ===== Interfaces ===== //
import { Specialty } from "./Specialty";

export interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: Specialty[];
  yearsOfExperience: number;
  phoneNumber: number;
}

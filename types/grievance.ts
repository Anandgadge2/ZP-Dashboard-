export type GrievanceStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "REJECTED";

export interface Grievance {
  grievanceId: string;
  userName: string;
  phone: string;
  category: string;
  status: GrievanceStatus;
  createdAt: string;
}

export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

export interface Appointment {
  appointmentId: string;
  userName: string;
  phone: string;
  department: string;
  status: AppointmentStatus;
  preferredDate: string;
  preferredTime: string;
  createdAt: string;
}

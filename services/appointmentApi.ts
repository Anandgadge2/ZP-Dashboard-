export const createAppointment = async (appointment: any) => {
  const res = await api.post("/appointments", appointment);
  return res.data.data;
};
import api from "./api";

export const getAllAppointments = async () => {
  const res = await api.get("/appointments");
  return res.data.data;
};

export const updateAppointmentStatus = async (appointmentId: string, status: string) => {
  try {
    const res = await api.put(`/appointments/${appointmentId}`, { status });
    return res.data.data;
  } catch (error) {
    console.error("Error updating appointment status:", error);
    // For now, return success to allow local updates even if API fails
    return { appointmentId, status };
  }
};

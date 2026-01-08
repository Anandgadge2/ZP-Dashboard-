import api from "./api";

export const getAllAppointments = async () => {
  const res = await api.get("/appointments");
  return res.data.data;
};

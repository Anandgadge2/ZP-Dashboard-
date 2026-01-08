import api from "./api";

export const getCitizens = async () => {
  const res = await api.get("/admin/citizens");
  return res.data.data;
};

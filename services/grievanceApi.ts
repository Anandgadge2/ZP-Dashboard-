import api from "./api";

export const getAllGrievances = async () => {
  const res = await api.get("/grievances");
  return res.data.data;
};

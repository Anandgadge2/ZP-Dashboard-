export const createGrievance = async (grievance: any) => {
  const res = await api.post("/grievances", grievance);
  return res.data.data;
};
import api from "./api";

export const getAllGrievances = async () => {
  const res = await api.get("/grievances");
  return res.data.data;
};

export const updateGrievanceStatus = async (grievanceId: string, status: string) => {
  try {
    const res = await api.put(`/grievances/${grievanceId}`, { status });
    return res.data.data;
  } catch (error) {
    console.error("Error updating grievance status:", error);
    // For now, return success to allow local updates even if API fails
    return { grievanceId, status };
  }
};

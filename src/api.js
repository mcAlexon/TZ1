const API_URL = "http://localhost:5000/seminars";

export const updateSeminar = async (updatedSeminar) => {
  const response = await fetch(`${API_URL}/${updatedSeminar.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedSeminar)
  });

  if (!response.ok) throw new Error("Ошибка при обновлении семинара");

  return response.json();
};
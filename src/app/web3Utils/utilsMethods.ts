// Delete user if verification condition is not met
export const handleDelete = async (userId: string) => {
  try {
    const response = await fetch("/api/userDelete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("An error occurred");
  }
};

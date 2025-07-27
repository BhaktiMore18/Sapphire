export async function predictCarbonFootprint(formData: any) {
  const response = await fetch("http://localhost:5000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return response.json();
}

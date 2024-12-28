"use server";

export async function createPerson(formData: FormData) {
  const obj: any = {
    firstName: formData.get("first_name"),
    lastName: formData.get("last_name"),
    phoneNum: formData.get("phoneNum"),
    address: formData.get("address"),
  };
  await fetch("http://localhost:8080/api/v1/people", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  return true;
}

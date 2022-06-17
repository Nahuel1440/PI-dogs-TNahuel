const postBreed = (data) => {
  fetch("http://localhost:3001/dogs", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((breed) => console.log("Success: breed created", breed))
    .catch((error) => console.log("Error:", error));
};

export default postBreed;

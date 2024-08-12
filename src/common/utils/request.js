export async function $api(type, callback) {
  const data = new URLSearchParams();
  data.append('type', type);

  return fetch(`http://127.0.0.1:9999/analysis/json?` + data.toString(), {
    method: "GET",
  }).then((data) => {
    return data.json();
  }).then(callback)
    .catch((error) => {
      console.error("An error occurred:", error.message);
    })
}

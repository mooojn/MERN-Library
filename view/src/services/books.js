const API_URL = "https://library-backend-seven.vercel.app/books";

export async function getBooks() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addBook(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export async function updateBook(id, data) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export async function deleteBook(id) {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

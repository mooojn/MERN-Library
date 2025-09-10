import React, { useState, useEffect } from 'react'
import './Books.css'

const Books = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ id: "", title: "", author: "" });

  // fetch all books
  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    const res = await fetch('http://localhost:3000/books');
    const json = await res.json();
    setBooks(json);
  }

  // add book
  async function handleAdd() {
    await fetch('http://localhost:3000/books', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: form.title, author: form.author })
    });
    await fetchBooks();
    resetForm();
  }

  // fill inputs when editing
  function handleEdit(book) {
    setForm({ id: book._id, title: book.title, author: book.author });
  }

  // update book
  async function handleUpdate() {
    if (!form.id) return;
    await fetch(`http://localhost:3000/books/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: form.title, author: form.author })
    });
    await fetchBooks();
    resetForm();
  }

  // delete book
  async function handleDelete() {
    if (!form.id) return;
    await fetch(`http://localhost:3000/books/${form.id}`, {
      method: "DELETE"
    });
    await fetchBooks();
    resetForm();
  }

  function resetForm() {
    setForm({ id: "", title: "", author: "" });
  }

  return (
    <>
      <div className='book-cards'>
        {books.map((book) =>
          <div className='book-card' key={book._id} onClick={() => handleEdit(book)}>
            <p>Author: {book.author}</p>
            <h1>{book.title}</h1>
            <button onClick={() => handleEdit(book)}>Edit</button>
          </div>
        )}
      </div>

      <div className="form">
        <label>Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <label>Author</label>
        <input
          type="text"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
      </div>

      <button onClick={handleAdd}>Add</button>
      {form.id && (
        <>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </>
  )
}

export default Books

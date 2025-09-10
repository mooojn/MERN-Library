import React, { useState, useEffect } from 'react';
import BookList from './components/BookList.jsx';
import BookForm from './components/BookForm.jsx';
import { getBooks, addBook, updateBook, deleteBook } from './services/books';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ id: "", title: "", author: "" });
  const fieldNames = ["title", "author"];

  const formFields = fieldNames.map(n => ({
    name: n,
    label: n.toUpperCase()
  }));

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    const data = await getBooks();
    setBooks(data);
  }

  async function handleAdd() {
    await addBook({ title: form.title, author: form.author });
    await fetchBooks();
    resetForm();
  }

  async function handleUpdate() {
    if (!form.id) return;
    await updateBook(form.id, { title: form.title, author: form.author });
    await fetchBooks();
    resetForm();
  }

  async function handleDelete() {
    if (!form.id) return;
    await deleteBook(form.id);
    await fetchBooks();
    resetForm();
  }

  function handleEdit(book) {
    setForm({ id: book._id, title: book.title, author: book.author });
  }

  function resetForm() {
    setForm({ id: "", title: "", author: "" });
  }

  return (
    <>
      <BookList books={books} onEdit={handleEdit} />
      <BookForm
        form={form}
        setForm={setForm}
        formFields={formFields}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </>
  );
};

export default BooksPage;

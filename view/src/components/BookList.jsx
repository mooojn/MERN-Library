import React from 'react'

const BookList = ({ books, onEdit }) => {
    return (
        <>
            <div className='book-cards'>
                {books.map((book) =>
                    <div className='book-card' key={book._id} onClick={() => onEdit(book)}>
                        <p>Author: {book.author}</p>
                        <h1>{book.title}</h1>
                    </div>
                )}
            </div>
        </>
    )
}

export default BookList

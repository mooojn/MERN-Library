import React from 'react';

const BookForm = ({ form, setForm, formFields, onAdd, onUpdate, onDelete }) => {
    return (
        <div className="form">
            {formFields.map((field, id) => (
                <div key={id} className="form-group">
                    <label>{field.label}: </label>
                    <input
                        type={field.type || "text"}
                        value={form[field.name] || ""}
                        onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    />
                </div>
            ))}

            <div className="form-buttons">
                <button onClick={onAdd} className="btn add">Add</button>
                {form.id && (
                    <>
                        <button onClick={onUpdate} className="btn update">Update</button>
                        <button onClick={onDelete} className="btn delete">Delete</button>
                    </>
                )}
            </div>
        </div>

    );
};

export default BookForm;

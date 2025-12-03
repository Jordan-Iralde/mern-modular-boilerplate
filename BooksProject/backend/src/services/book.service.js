import Book from '../models/book.model.js';

export const createBook = async (data) => {
    const book = new Book(data);
    return await book.save();
};

export const getBooks = async (query) => {
    const { page = 1, limit = 10, search = '' } = query;
    const filter = search
        ? { title: { $regex: search, $options: 'i' } }
        : {};

    const books = await Book.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit));

    const total = await Book.countDocuments(filter);
    return { books, total, page: Number(page), limit: Number(limit) };
};

export const getBookById = async (id) => {
    return await Book.findById(id);
};

export const updateBook = async (id, data) => {
    return await Book.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBook = async (id) => {
    return await Book.findByIdAndDelete(id);
};

import * as BookService from '../services/book.service.js';

export const createBook = async (req, res, next) => {
    try {
        const book = await BookService.createBook(req.body);
        res.status(201).json(book);
    } catch (err) {
        next(err);
    }
};

export const getBooks = async (req, res, next) => {
    try {
        const data = await BookService.getBooks(req.query);
        res.json(data);
    } catch (err) {
        next(err);
    }
};

export const getBookById = async (req, res, next) => {
    try {
        const book = await BookService.getBookById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        next(err);
    }
};

export const updateBook = async (req, res, next) => {
    try {
        const book = await BookService.updateBook(req.params.id, req.body);
        res.json(book);
    } catch (err) {
        next(err);
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        await BookService.deleteBook(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

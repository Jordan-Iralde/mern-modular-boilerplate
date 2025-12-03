// controllers/import.controller.js
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import Book from '../books/book.model.js';

export const importBooksCSV = async (req, res, next) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const results = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                const books = results.map(b => ({
                    title: b.title,
                    author: b.author,
                    description: b.description,
                    publishedDate: b.publishedDate ? new Date(b.publishedDate) : null,
                }));
                await Book.insertMany(books);
                res.json({ success: true, imported: books.length });
            });
    } catch (err) {
        next(err);
    }
};

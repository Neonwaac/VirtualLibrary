import BookModel from "../models/BookModel.js";

export const getAllBooks = async (req, res) => {
    try {
        const books = await BookModel.findAll();
        res.json(books);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getBook = async (req, res) => {
    try {
        const book = await BookModel.findAll({
            where: { id: req.params.id }
        });
        res.json(book[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

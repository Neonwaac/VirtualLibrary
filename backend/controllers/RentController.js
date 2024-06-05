import RentsModel from "../models/RentModel.js";
import BooksModel from "../models/BookModel.js";

export const getAllRents = async (req, res) => {
    const userId = req.query.userId;
    try {
        const rents = await RentsModel.findAll({
            where: { rents_userid: userId },
            include: [{
                model: BooksModel,
                attributes: ['books_title', 'books_description', 'books_photo']
            }]
        });
        res.json(rents);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getRent = async (req, res) => {
    try {
        const rent = await RentsModel.findOne({
            where: { rents_id: req.params.id, rents_userid: req.query.userId },
            include: [{
                model: BooksModel,
                attributes: ['books_title', 'books_description', 'books_photo']
            }]
        });
        res.json(rent);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createRent = async (req, res) => {
    try {
       const rent = await RentsModel.create(req.body);
       await BooksModel.update({ is_rented: true }, { where: { books_id: req.body.rents_bookid } });
       res.json({
           "message": "¡Renta creada correctamente!"
       });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteRent = async (req, res) => {
    try {
        const rent = await RentsModel.findOne({ where: { rents_id: req.params.id } });
        await BooksModel.update({ is_rented: false }, { where: { books_id: rent.rents_bookid } });
        await RentsModel.destroy({ where: { rents_id: req.params.id } });
        res.json({
            "message": "¡Renta eliminada correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};
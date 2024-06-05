// BookModel.js
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const BooksModel = db.define('books', {
    books_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    books_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    books_description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    books_author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    books_price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    books_genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    books_photo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_rented: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default BooksModel;


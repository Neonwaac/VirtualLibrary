// RentModel.js
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import BooksModel from "./BookModel.js";

const RentsModel = db.define('rents', {
    rents_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    rents_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    rents_duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rents_bookid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: BooksModel,
            key: 'books_id'
        }
    },
    rents_userid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rents_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

BooksModel.hasMany(RentsModel, { foreignKey: 'rents_bookid' });
RentsModel.belongsTo(BooksModel, { foreignKey: 'rents_bookid' });

export default RentsModel;


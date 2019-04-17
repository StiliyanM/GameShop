const mongoose = require('mongoose');


const gameSchema = mongoose.Schema({
    title: { type: mongoose.Schema.Types.String, required: true },
    publisher: { type: mongoose.Schema.Types.String, required: true },
    genre: { type: mongoose.Schema.Types.String, required: true },
    year: { type: mongoose.Schema.Types.Number, required: true },
    description: { type: mongoose.Schema.Types.String, required: true },
    cover: { type: mongoose.Schema.Types.String, required: true },
    price: { type: mongoose.Schema.Types.Number, required: true },
    creationDate: { type: mongoose.Schema.Types.Date, default: Date.now },
});


const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
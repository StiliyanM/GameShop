const validator = require('validator');
const Game = require('../models/Game')

function validateForm(payload) {
    let errors = {};
    let isFormValid = true;

    if (!payload || typeof payload.title !== 'string' || payload.title.trim().length === 0) {
        isFormValid = false;
        errors.title = 'Please provide title.';
    }

    if (!payload || typeof payload.publisher !== 'string' || payload.publisher.trim().length === 0) {
        isFormValid = false;
        errors.publisher = 'Please provide publisher.';
    }

    if (!payload || typeof payload.genre !== 'string' || payload.genre.trim().length === 0) {
        isFormValid = false;
        errors.genre = 'Please provide genre.';
    }

    if (!payload || isNaN(Number(payload.year))) {
        isFormValid = false;
        errors.year = 'Please provide game release year.';
    }

    if (!payload || typeof payload.description !== 'string' || payload.description.trim().length < 10) {
        isFormValid = false;
        errors.description = 'Description must be at least 10 symbols long.';
    }

    if (!payload || !payload.cover || !validator.isURL(payload.cover)) {
        isFormValid = false;
        errors.cover = 'Please provide proper url for the game\'s cover';
    }

    if (!payload || isNaN(Number(payload.price)) || Number(payload.price) < 0 || payload.pagesCount === '') {
        isFormValid = false;
        errors.price = 'Please provide game price.';
    }

    return {
        success: isFormValid,
        errors
    };
}

module.exports = {
    getSingle: (req, res) => {
        let gameId = req.params.gameId;

        Game.findById(gameId)
            .then((game) => {
                if (!game) {
                    return res.status(400).json({
                        message: 'There is no game with the given id in our database.'
                    });
                }

                return res.status(200).json({
                    message: '',
                    data: game
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(400).json({
                    message: 'Something went wrong, please try again.'
                });
            });
    },

    add: (req, res) => {
        let game = req.body;

        let validationResult = validateForm(game);

        if (!validationResult.success) {
            return res.status(400).json({
                message: 'game form validation failed!',
                errors: validationResult.errors
            });
        }

        Game.create(game).then((newgame) => {
            return res.status(200).json({
                message: 'game created successfully!',
                data: newgame
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    edit: (req, res) => {
        let gameId = req.params.gameId;
        let editedGame = req.body;

        let validationResult = validateForm(editedGame);

        if (!validationResult.success) {
            return res.status(400).json({
                message: 'game form validation failed!',
                errors: validationResult.errors
            });
        }

        Game.findById(gameId).then((game) => {
            if (!game) {
                return res.status(400).json({
                    message: 'There is no game with the given id in our database.'
                });
            }

            game.title = editedGame.title;
            game.publisher = editedGame.publisher;
            game.genre = editedGame.genre;
            game.year = editedGame.year;
            game.description = editedGame.description;
            game.cover = editedGame.cover;
            game.price = editedGame.price;
            Game.save();

            return res.status(200).json({
                message: 'game edited successfully!',
                data: game
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    delete: (req, res) => {
        let gameId = req.params.gameId;

        Game.findByIdAndRemove(gameId).then((deletedGame) => {
            if (!deletedGame) {
                return res.status(400).json({
                    message: 'There is no game with the given id in our database.'
                });
            }

            return res.status(200).json({
                message: 'game deleted successfully.',
                data: deletedGame
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    all: (req, res) => {

        Game.find({}).then((result) => {
                return res.status(200).json({
                    message: '',
                    data: result,
                });
            })
            .catch(() => {
                return res.status(400).json({
                    message: 'Bad Request!'
                });
            });
    }
};
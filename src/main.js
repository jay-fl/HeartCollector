import { Presentation } from "./presentation.js";
import { Game } from "./game.js";
import { GameOver } from "./game-over.js";
import { Congratulation } from "./congratulation.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: false,
        }
    },
    scene: [Presentation, Game, GameOver, Congratulation]
};

var score = 0;
var scoreText;
var gameOver = false;

var game = new Phaser.Game(config);
import { RestartButton } from "../components/restart-button.js";
export class GameOver extends Phaser.Scene {

    constructor() {
        super({ key: 'gameover' });
        this.i = 0;
        this.restartButton = new RestartButton(this);
    }

    preload() {
        this.restartButton.preload();
        this.load.audio('game-over', 'assets/audio/gameover.mp3');
    }

    create() {

        this.gameOver = this.sound.add('game-over');
        this.hsv = Phaser.Display.Color.HSVColorWheel();

        this.text1 = this.add.text(170, 250, 'GAME OVER', { font: "64px Arial Black", fill: "#fff" });
        this.text1.setStroke('#00f', 16);
        this.text1.setShadow(2, 2, "#333333", 2, true, true);

        setTimeout(() => {
            this.restartButton.create();
        }, 5000);

        this.gameOver.play();
    }


    update() {
        const top = this.hsv[this.i].color;
        const bottom = this.hsv[359 - this.i].color;

        this.text1.setTint(top, top, bottom, bottom);


        this.i++;

        if (this.i === 360) {
            this.i = 0;
        }



    }


}
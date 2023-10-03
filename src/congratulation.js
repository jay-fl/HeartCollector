import { RestartButton } from "../components/restart-button.js";
let sprites = [];

export class Congratulation extends Phaser.Scene {

    constructor() {
        super({ key: 'congratulation' });
        this.i = 0;
        this.restartButton = new RestartButton(this);
    }

    preload() {
        this.load.image('particle', 'assets/img/yellow.png');
        this.load.audio('congratulations', 'assets/audio/congratulations.mp3');

        this.restartButton.preload();
    }

    create() {

        this.congratulation = this.sound.add('congratulations');

        //  Create the particles
        for (var i = 0; i < 300; i++) {
            var x = Phaser.Math.Between(-64, 800);
            var y = Phaser.Math.Between(-64, 600);

            var image = this.add.image(x, y, 'particle');

            image.setBlendMode(Phaser.BlendModes.OVERLAY);
            //image.setBlendMode(Phaser.BlendModes.ADD);//  Canvas and WebGL:

            // NORMAL
            // ADD // MULTIPLY // SCREEN //  Canvas only:  // OVERLAY  // DARKEN  // LIGHTEN // COLOR_DODGE  
            // COLOR_BURN  // HARD_LIGHT // SOFT_LIGHT // DIFFERENCE   // EXCLUSION  // HUE // SATURATION  // COLOR
            // LUMINOSITY

            sprites.push({ s: image, r: 2 + Math.random() * 6 });
        }

        this.hsv = Phaser.Display.Color.HSVColorWheel();

        this.text1 = this.add.text(40, 250, 'CONGRATULATIONS', { font: "64px Arial Black", fill: "#fff" });
        this.text1.setStroke('#00f', 16);
        this.text1.setShadow(2, 2, "#333333", 2, true, true);

        setTimeout(() => {
            this.restartButton.create();

        }, 7000);
        this.congratulation.play();


    }

    update() {
        const top = this.hsv[this.i].color;
        const bottom = this.hsv[359 - this.i].color;

        this.text1.setTint(top, top, bottom, bottom);


        this.i++;

        if (this.i === 360) {
            this.i = 0;
        }

        for (var i = 0; i < sprites.length; i++) {
            var sprite = sprites[i].s;

            sprite.y -= sprites[i].r;

            if (sprite.y < -256) {
                sprite.y = 700;
            }
        }
    }
}
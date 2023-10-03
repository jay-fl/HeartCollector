export class Presentation extends Phaser.Scene {

    constructor() {
        super({ key: 'presentation' });
        this.i = 0;
    }



    create() {
        this.hsv = Phaser.Display.Color.HSVColorWheel();

        this.text1 = this.add.text(250, 280, 'Loading...', { font: "54px Arial Black", fill: "#fff" });
        this.text1.setStroke('#00f', 16);
        this.text1.setShadow(2, 2, "#333333", 2, true, true);

        setTimeout(() => {
            this.scene.start('game');
        }, 5000);
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
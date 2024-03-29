export class RestartButton {

    constructor(scene) {
        this.relatedScene = scene;
    }

    //metodos

    preload() {
        this.relatedScene.load.spritesheet('button', 'assets/img/button-sprite.png', { frameWidth: 600, frameHeight: 192 });
    }

    create() {
        this.startButton = this.relatedScene.add.sprite(400, 500, 'button').setInteractive().setScale(.3);

        this.startButton.on('pointerover', () => {
            this.startButton.setFrame(1);
        });
        this.startButton.on('pointerout', () => {
            this.startButton.setFrame(0);
        });
        this.startButton.on('pointerdown', () => {
            this.relatedScene.scene.start('presentation');

        });
    }


}
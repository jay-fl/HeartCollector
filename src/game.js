let timer;


export class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'game' });
        this.score;

    }



    preload() {


        this.load.image('background', 'assets/img/background.png');

        this.load.image('wall', 'assets/img/wall.png');

        this.load.image('floor', 'assets/img/floor.png')

        this.load.image('platform', 'assets/img/mini-platform.png');

        this.load.spritesheet('dude', 'assets/img/dude.png', { frameWidth: 32, frameHeight: 48 });

        this.load.image('heart', 'assets/img/heart.png');

        this.load.spritesheet('enemy', 'assets/img/enemy.png', { frameWidth: 315, frameHeight: 250 });

        //audios
        this.load.audio('jump', 'assets/audio/pickup.wav');

        this.load.audio('key', 'assets/audio/key.wav');

        this.load.audio('steps', 'assets/audio/steps2.mp3');

        this.load.audio('background', 'assets/audio/tommy_in_goa.mp3');

        this.load.audio('miss', 'assets/audio/miss.ogg');

        this.load.audio('win', 'assets/audio/cartoon_success_fanfair.mp3');


    }

    create() {

        //tiempo
        this.iter = 0;
        timer = this.time.addEvent({ delay: 366000, callback: this.showGameOver, callbackScope: this });

        this.score = 300;
        this.add.image(400, 185, 'background');
        this.wall = this.physics.add.staticGroup();
        this.wall.create(90, 185, 'wall');
        this.wall.create(710, 185, 'wall');

        this.floor = this.physics.add.staticGroup();
        this.floor.create(400, 355, 'floor').setScale(1.1);

        this.platform = this.physics.add.staticGroup();
        this.platform.create(170, 225, 'platform');
        this.platform.create(400, 225, 'platform');
        this.platform.create(627, 225, 'platform');
        this.platform.create(285, 105, 'platform');
        this.platform.create(510, 105, 'platform');

        //sonidos
        this.heartSound = this.sound.add('key');
        this.heartSound.setVolume(.7);
        this.jumpSound = this.sound.add('jump');
        this.jumpSound.setVolume(.5);
        this.setpSound = this.sound.add('steps');
        this.setpSound.setVolume(.7);
        this.death = this.sound.add('miss');
        this.won = this.sound.add('win');

        this.music = this.sound.add('background');
        this.music.setVolume(.8);
        //this.music.loop = true;
        this.music.play();
        this.music.loop = true;

        this.info = this.add.text(480, 16, '', { font: '32px Arial', fill: '#000000' });




        this.player = this.physics.add.sprite(150, 250, 'dude');

        this.player.setSize(12, 35)
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(.3);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.platform);
        this.physics.add.collider(this.player, this.wall);

        //enemigos


        // this.enemys = this.physics.add.group();
        this.enemy = this.physics.add.sprite(400, 320, 'enemy').setScale(.1);
        this.enemy1 = this.physics.add.sprite(250, 77, 'enemy').setScale(.1);
        this.enemy2 = this.physics.add.sprite(118, 198, 'enemy').setScale(.1);
        this.enemy3 = this.physics.add.sprite(200, 300, 'enemy').setScale(.1);



        this.enemy.setCollideWorldBounds(true);
        this.enemy1.setCollideWorldBounds(true);
        this.enemy2.setCollideWorldBounds(true);
        this.enemy3.setCollideWorldBounds(true);

        this.physics.add.collider(this.enemy3, this.floor);
        this.physics.add.collider(this.enemy3, this.wall);



        this.physics.add.collider(this.enemy, this.floor);
        this.physics.add.collider(this.enemy, this.wall);

        this.physics.add.collider(this.enemy1, this.platform);
        this.physics.add.collider(this.enemy1, this.wall);

        this.physics.add.collider(this.enemy2, this.platform);
        this.physics.add.collider(this.enemy2, this.wall);

        this.physics.add.collider(this.enemy1, this.enemy);
        this.physics.add.collider(this.enemy2, this.enemy);

        this.physics.add.collider(this.enemy3, this.floor);
        this.physics.add.collider(this.enemy3, this.wall);
        this.physics.add.collider(this.enemy3, this.platform);


        this.enemy.setBounce(.3);
        this.anims.create({
            key: 'fire_walk',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 5 }),
            repeat: -1,
            frameRate: 10
        });
        this.enemy.anims.play('fire_walk');

        this.enemy1.setBounce(.3);
        this.enemy1.anims.play('fire_walk');

        this.enemy2.setBounce(.3);
        this.enemy2.anims.play('fire_walk');

        this.enemy3.setBounce(.3);
        this.enemy3.anims.play('fire_walk');


        this.enemy.setImmovable(true);
        this.enemy.body.allowGravity = false;
        this.enemy.setVelocityX(50);

        this.enemy1.setImmovable(true);
        this.enemy1.body.allowGravity = false;
        this.enemy1.setVelocityX(50);

        this.enemy2.setImmovable(true);
        this.enemy2.body.allowGravity = false;
        this.enemy2.setVelocityX(50);
        //

        this.enemy3.visible = false;
        this.time.addEvent({
            delay: 5000,
            loop: true,
            callback: () => this.enemy3.flipX = !this.enemy3.flipX
        });



        this.cursors = this.input.keyboard.createCursorKeys();




        this.hearts = this.physics.add.group({
            key: 'heart',
            repeat: 13,
            setXY: { x: Phaser.Math.FloatBetween(101, 150), y: Phaser.Math.FloatBetween(0, 250), stepX: 42 }
        });
        this.physics.add.collider(this.hearts, this.floor);

        this.hearts.children.iterate(function(child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });



        this.physics.add.collider(this.hearts, this.platform);

        this.physics.add.overlap(this.player, this.hearts, this.collectHearts, null, this);
        this.scoreText = this.add.text(130, 16, 'Score: 300', { font: '32px Arial', fill: '#000' });

        this.physics.add.collider(this.player, this.enemy, this.hitEnemy, null, this);
        this.physics.add.collider(this.player, this.enemy1, this.hitEnemy, null, this);
        this.physics.add.collider(this.player, this.enemy2, this.hitEnemy, null, this);
        //this.physics.add.collider(this.player, this.enemy3, this.hitEnemy, null, this);





    }

    update() {

        this.info.setText('Time: ' + Math.floor(366 - timer.getElapsedSeconds()));

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-120);
            this.player.anims.play('left', true);
            if (!this.setpSound.isPlaying)
                this.setpSound.play();


        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(120);
            this.player.anims.play('right', true);
            if (!this.setpSound.isPlaying)
                this.setpSound.play();

        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');

        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-410);
            this.jumpSound.play();
        }

        //



        setTimeout(() => {
            if (this.enemy3.y > 310) {
                this.enemy3.setVelocityY(-410);
            }

        }, 1500);
        this.enemy3.x = 400 - Math.sin(this.iter * 6) * 250;
        this.iter += 0.001;




        if (this.score >= 258) {
            this.moveEnemy(this.enemy, 50, 115, 678);
            this.moveEnemy(this.enemy1, 50, 220, 570);
            this.moveEnemy(this.enemy2, 50, 115, 678);
        }
        if (this.score < 258 && this.score >= 216) {
            this.moveEnemy(this.enemy, 70, 115, 678);
            this.moveEnemy(this.enemy1, 70, 220, 570);
            this.moveEnemy(this.enemy2, 70, 115, 678);
        }
        if (this.score < 216 && this.score >= 174) {
            this.moveEnemy(this.enemy, 90, 115, 678);
            this.moveEnemy(this.enemy1, 90, 220, 570);
            this.moveEnemy(this.enemy2, 90, 115, 678);
        }
        if (this.score < 174 && this.score >= 132) {
            this.moveEnemy2(this.enemy, 30);
            this.moveEnemy(this.enemy1, 110, 220, 570);
            this.moveEnemy(this.enemy2, 110, 115, 678);
        }
        if (this.score < 132 && this.score >= 90) {
            this.moveEnemy2(this.enemy, 35);
            this.moveEnemy(this.enemy1, 130, 220, 570);
            this.moveEnemy(this.enemy2, 130, 115, 678);
        }
        if (this.score < 90 && this.score >= 0) {
            this.moveEnemy2(this.enemy, 40);
            this.moveEnemy(this.enemy1, 150, 220, 570);
            this.moveEnemy(this.enemy2, 150, 115, 678);
            this.enemy3.visible = true;

            this.physics.add.collider(this.player, this.enemy3, this.hitEnemy, null, this);

        }



    }

    collectHearts(player, heart) {
        heart.disableBody(true, true);
        this.heartSound.play();

        this.score -= 1;

        this.scoreText.setText('Score: ' + this.score);

        if (this.hearts.countActive(true) === 0) {
            this.hearts.children.iterate(function(child) {
                child.enableBody(true, child.x, Phaser.Math.FloatBetween(0, 250), true, true);
            });
        }

        if (this.score < 1) {

            this.won.play();
            this.music.stop();
            player.setTint(0x008000);
            this.physics.pause();
            this.scene.pause();

            player.anims.play('turn');
            this.enemy.visible = false;
            this.enemy1.visible = false;
            this.enemy2.visible = false;
            this.enemy3.destroy();

            setTimeout(() => {
                this.showCongratulations();
            }, 3000);
        }
    }

    hitEnemy(player, enem) {
        this.death.play();
        this.physics.pause();
        this.music.stop();
        player.anims.play('turn');

        player.setTint(0xff0000);
        this.enemy.visible = false;
        this.enemy1.visible = false;
        this.enemy2.visible = false;
        this.enemy3.destroy();




        setTimeout(() => {
            player.destroy();

            this.showGameOver();
        }, 3000);

        this.scene.pause();

        //this.gameOver = true;
    }

    moveEnemy(enemy, velocity, posXini, posXfin) {

        if (enemy.x >= posXfin) {
            enemy.setVelocityX(-velocity);
            enemy.flipX = true;

        } else if (enemy.x <= posXini) {
            enemy.setVelocityX(velocity);
            enemy.flipX = false;

        }

    }

    moveEnemy2(enemy, velocity) {

        if ((Phaser.Math.Distance.BetweenPoints(this.player, enemy) <= 600)) {
            if ((this.player.x - enemy.x) < -20) {
                enemy.setVelocityX(-velocity);
            } else if ((this.player.x - enemy.x) > 20) {
                enemy.setVelocityX(velocity);
            } else {
                enemy.setVelocityX(0);
            }

            if ((this.player.y - enemy.y) < -20) {
                enemy.setVelocityY(-velocity);
            } else if ((this.player.y - enemy.y) > 20) {
                enemy.setVelocityY(velocity);
            } else {
                enemy.setVelocityY(0);
            }
        } else {
            enemy.setVelocity(0);
        }
    }

    showGameOver() {
        this.music.stop();
        this.scene.start('gameover');
    }

    showCongratulations() {
        this.music.stop();
        this.scene.start('congratulation');

    }

}
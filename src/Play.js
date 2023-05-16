class Play extends Phaser.Scene {
    constructor() {
        super('Play');
    }

    preload() {
        
        this.load.image('MenuBubble', 'assets/Box.png');
        this.load.image('floor', 'assets/again.png');
        this.load.image('Player', 'assets/Player.png');
 
        this.load.image('Wall', 'assets/Wall.png');
        this.load.image('Diedlogo', 'assets/Died.png');
        this.load.image('MainMenuLogo', 'assets/Menu.png');
        this.load.image('BackGround1', 'assets/background1.png'); 

       
        this.load.audio('hop', './assets/JumpSound.wav');
        this.load.audio('select', './assets/click.wav');
        this.load.audio('deathsound', './assets/gameover.wav');
        this.load.audio('totallyfittingsong', './assets/Music.mp3');

    }

    create() {
        this.sound.play('totallyfittingsong');

        this.stop = false;
        let score = 0;

        this.speed = 1;
        setInterval(() => {
            this.speed += 0.10;
        }, 30000);

        const lvlfloor = this.textures.get('floor');
        const floorwidth = this.cameras.main.width;
        const floorheight = lvlfloor.getSourceImage().height;

        this.PlayBackground = this.add.tileSprite(0,0, 840, 580, 'BackGround1').setScale(2);

        this.c_floor = this.add.tileSprite(0, this.cameras.main.height, floorwidth, floorheight, 'floor').setOrigin(0, 1);
        this.physics.add.existing(this.c_floor);
        this.c_floor.body.setImmovable(true);
        this.c_floor.body.allowGravity = false;
        this.c_floor.body.setSize(83, 580);
        this.c_floor.body.setOffset(0, 0);
        

        this.ball = this.physics.add.sprite(50, 0, 'Player');
        this.ball.setBounce(0.2);
        this.ball.setCollideWorldBounds(true);
        this.ball.setDepth(1);
        this.ball.body.setCircle(32);
       //this.ball.body.setSize(44,64);
        this.ball.body.setOffset(0,0);
        this.ball.body.gravity.y = 200;

        const jumps = this.input.keyboard.addKey ('W');
        const drop =  this.input.keyboard.addKey ('S');

        let playaDoubleJump = true;
        let num_jumps = 0;

        function jump() {
            if (num_jumps == 0) {
                this.ball.setVelocityY(-300);
                num_jumps++;
            } else if (playaDoubleJump && num_jumps == 1) {
                this.ball.setVelocityY(-400);
                num_jumps++;
                playaDoubleJump = false;
            }
            this.sound.play('hop');
        }


        function resetjump() {
            num_jumps = 0;
            playaDoubleJump = true;
        }

        function goDown() {
            this.ball.setVelocityY(400);
        }

    
        this.physics.add.collider(this.ball, this.c_floor, resetjump);

        jumps.on('down', jump, this); 
        drop.on('down', goDown, this);


        this.walls = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });


        this.walltimer = this.time.addEvent({
            delay: 7000 / this.speed,
            callback: Wallcount,
            callbackScope: this,
            loop: true


    });
        function Wallcount() {
            const num_Walls = Phaser.Math.Between(1,8); 
            for (let i = 0; i < num_Walls; i++) {
            const wall = this.walls.create(this.cameras.main.width - 132, this.cameras.main.height -132, 'Wall');
            wall.setOrigin(0, 1);
            wall.body.setSize(44, 64);
            wall.body.setOffset(10, 0);
            wall.setVelocityX(-200);
            wall.setDepth(0);


            this.randomWallscale = Phaser.Math.Between(10,20) / 10.0;
            wall.setScale(1.0, this.randomWallscale);
            
        }
        const newspawntime = Phaser.Math.Between(0,5000);
        this.walltimer.delay = newspawntime;
    } 

    this.scoretext = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Distance: 0',{
        fontsize: '512px',
        fill: '#FFF'
    } ).setOrigin(0.50,8).setScale(2);

    this.timer =this.time.addEvent({
        delay: 1000 / this.speed,
        callback: function() {
            score++;
            this.scoretext.setText('Distance: ' + score);
        },
        callbackScope: this,
        loop: true
    });

 

        function death() {
            this.stop = true;
            this.physics.pause();
            this.timer.remove(false);
            const deathmenu = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'MenuBubble');
            deathmenu.setOrigin(0.5);

            this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'Diedlogo').setOrigin(0.20, 0.5).setDisplaySize(0, 0).setScale(0.3);

            this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'Button1').setOrigin(0.85, 0.45).setDisplaySize(0, 0).setScale(0.3);
            this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'Button1').setOrigin(0.85, 0.035).setDisplaySize(0, 0).setScale(0.3);

            const click6 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'MainMenuLogo').setOrigin(1.90, 0.6).setDisplaySize(0, 0).setScale(0.25);
            click6.setInteractive();
            click6.on ('pointerdown', () => {
                this.sound.play('select');
                this.scene.start('mainMenu');
            })

            const click7 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'Play').setOrigin(2, -1.5).setDisplaySize(0, 0).setScale(0.25);
            click7.setInteractive();
            click7.on ('pointerdown', () => {
                this.sound.play('select');
                this.scene.start('Play');
            })

            this.finalscore = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, `Distance: ${score}`, {
                fontSize: '32px',
                fill: '#00000',
            }).setOrigin(1.1,3.8).setScale(0.8, 0.8);

            this.sound.play('deathsound');
        }

        this.physics.add.collider(this.ball, this.walls, function() {
            death.call(this);
        }, null, this);
     
//debugging tools 
        //this.physics.world.createDebugGraphic();
    }

    update() {
        
      if (!this.stop == true) {
            this.c_floor.tilePositionX += 2 * this.speed;
            this.PlayBackground.tilePositionX += 0.5;
        } else {
            this.c_floor.tilePositionX = 0;
        } 
        this.walls.getChildren().forEach((wall) => {
            wall.body.velocity.x = -200 * this.speed;
        })

      


    }
}


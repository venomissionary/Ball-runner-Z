class mainMenu extends Phaser.Scene {
    constructor() {
        super('mainMenu');
    }

    preload() {
        this.load.image('MenuBubble', 'assets/Box.png');
        this.load.image('BackGround1', 'assets/background1.png'); 
        this.load.image('Button1', 'assets/Box2.png');
        
        this.load.image('Titlelogo', 'assets/BallRunnerLogo.png');
        this.load.image('Back', 'assets/Back.png');
        this.load.image('Credit', 'assets/Credits.png');
        this.load.image('Play', 'assets/Play.png');
        this.load.image('Tutorial', 'assets/Tutorial.png');

        this.load.image('Quit', 'assets/Quit.png');
        this.load.image('Resume', 'assets/Resume.png');
     
    
        this.load.audio('select', './assets/click.wav');
    
    }

    create() {
        this.scroll = this.add.tileSprite(0,0, 840, 580, 'BackGround1').setScale(2);
        
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'MenuBubble').setOrigin(0.49, 0.5).setDisplaySize(500, 500).setScale(1.4);
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'Button1').setOrigin(0.89, 0.8).setDisplaySize(0, 0).setScale(0.4);
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'Button1').setOrigin(0.89, 0.4).setDisplaySize(0, 0).setScale(0.4);
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'Button1').setOrigin(0.89, 0.02).setDisplaySize(0, 0).setScale(0.4);
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'Titlelogo').setOrigin(0.23, 0.5).setDisplaySize(0, 0).setScale(0.4);
        
        const click1 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'Tutorial').setOrigin(1.63, 2.8).setDisplaySize(0, 0).setScale(0.25);
        click1.setInteractive();
        click1.on('pointerdown', () =>  {
            this.sound.play('select');
        this.scene.start('Tutorial');
        });
        
        const click2 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'Credit').setOrigin(1.75, 0.3).setDisplaySize(0, 0).setScale(0.3);
        click2.setInteractive();
        click2.on('pointerdown', () =>  {
            this.sound.play('select');
        this.scene.start('Credits');
        });

        const click3 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'Play').setOrigin(2.3, -1.8).setDisplaySize(0, 0).setScale(0.3);
        click3.setInteractive();
        click3.on('pointerdown', () =>  {
            this.sound.play('select');
        this.scene.start('Play');
        });

      }

    update() {
        this.scroll.tilePositionX += 0.1;
    
    }
    



}

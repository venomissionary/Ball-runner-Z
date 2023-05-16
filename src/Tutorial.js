class Tutorial extends Phaser.Scene {
    constructor() {
        super('Tutorial');
    }

    preload() {
        this.load.image('MenuBubble', 'assets/Box.png');
        this.load.image('BackGround1', 'assets/background1.png'); 
        this.load.image('Back', 'assets/Back.png');
        this.load.image('Tutorial', 'assets/Tutorial.png');
        this.load.image('spacebar', 'assets/SpaceBar.png')
        this.load.image('keybinds', 'assets/Keybinds.png')
        this.load.image('escape', 'assets/esc.png');


        this.load.audio('select', './assets/click.wav');


    }

    create() {
        
        this.scroll = this.add.tileSprite(0,0, 840, 580, 'BackGround1').setScale(2);

        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'MenuBubble').setOrigin(0.49, 0.5).setDisplaySize(500, 500).setScale(1.4);
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'Button1').setOrigin(0, 0).setDisplaySize(0, 0).setScale(0.3);
        const click5 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'Back').setOrigin(-1.25, -1.27).setDisplaySize(0, 0).setScale(0.3);
        click5.setInteractive();
        click5.on('pointerdown', () =>  {
            this.sound.play('select');
        this.scene.start('mainMenu');
        });
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'Tutorial').setOrigin(0.50, 3.20).setDisplaySize(0, 0).setScale(0.3);
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'keybinds').setOrigin(0.65, 0.60).setDisplaySize(0, 0).setScale(1);
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'spacebar').setOrigin(0.75, 0.80).setDisplaySize(0, 0).setScale(0.3);

    }

    update() {
        this.scroll.tilePositionX += 0.1;

    }
}
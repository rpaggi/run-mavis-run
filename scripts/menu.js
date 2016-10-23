var menu = {};

menu = function() {}

menu.prototype =  {
    'preload' : function(){
        l = this.load.spritesheet('loading', 'assets/images/loading.jpg', 800, 600, 4);
        loading = this.add.sprite(0, 0, 'loading');
        loading.animations.add('change');
        loading.animations.play('change', 4, true);        

        this.load.spritesheet('bgMenu', 'assets/images/menu/bg.jpg', 800, 600, 2);
        this.load.spritesheet('btnStart', 'assets/images/menu/start-button.png', 460, 47, 2);
        this.load.audio('bgMusic', 'assets/musics/take_a_chance.mp3');

        loading.destroy();
    },
    'create' : function() {
        bg = this.add.sprite(0, 0, 'bgMenu');
        btnStart = this.add.sprite(200, 510, 'btnStart');
        btnStart.animations.add('change',[0,1])
        bg.animations.add('change', [0,1]);
        bgMusic = this.add.sound('bgMusic', 0.2 , true);
        bgMusic.play();
    },
    'update' : function() {
        bg.animations.play('change', 4, true)
        btnStart.animations.play('change', 1.5, true)

        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            bgMusic.destroy();
            this.state.start('game');
        }
    }
}
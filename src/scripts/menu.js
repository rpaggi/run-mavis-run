var menu = {};

menu = function() {}

menu.prototype =  {
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
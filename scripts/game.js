var game = {};

game = function() {}

game.prototype = {
    'preload' : function() { // Here load all the game assets
        this.load.image('bgGame', 'assets/images/game/gameBg.jpg');
        this.load.image('bgGrass', 'assets/images/game/grass.png');
        this.load.image('trunkLeft', 'assets/images/game/trunkL.png');
        this.load.image('trunkRight', 'assets/images/game/trunkR.png');
        this.load.spritesheet('mavis', 'assets/images/game/mavis.png', 40, 60, 3);
        this.load.audio('backgroundMusic', 'assets/musics/pixel_peeker_polka.mp3');
    },

    'create' : function() { // Link all the loaded assets in game
        this.physics.startSystem(Phaser.Physics.ARCADE);

        bg1 = this.add.sprite(0, 0, 'bgGame');
        bg2 = this.add.sprite(0, -600, 'bgGame');

        grass1 = this.add.sprite(0, 0, 'bgGrass');
        grass2 = this.add.sprite(0, -600, 'bgGrass');

        trunkLeft = this.add.sprite(0, 300, 'trunkLeft');
        trunkLeft.sense = 1
        trunkLeft.side = 'L'
        trunkLeft.scored = false;
        this.physics.enable(trunkLeft, Phaser.Physics.ARCADE);        
        trunkLeft.body.collideWorldBounds = true;

        trunkRight = this.add.sprite(508, 300, 'trunkRight');
        trunkRight.sense = 1
        trunkRight.side = 'R'
        trunkRight.scored = false;
        this.physics.enable(trunkRight, Phaser.Physics.ARCADE);        
        trunkRight.body.collideWorldBounds = true;

        grass1.bringToTop(); 
        grass2.bringToTop(); 

        mavis = {
            'sprite' : this.add.sprite(380, 500, 'mavis'),
            'spaceDown' : false,
            'dead' : false,
            'bones' : 0   
        }        
        mavis.sprite.animations.add('walk', [0,1]);
        mavis.sprite.frame = 1;
        this.physics.enable(mavis.sprite, Phaser.Physics.ARCADE);
        mavis.sprite.body.collideWorldBounds = true;

        backgroundMusic = this.add.sound('backgroundMusic', 0.4 , true);
        backgroundMusic.play();
        trunks = [trunkLeft, trunkRight];    
        trunksIncrement = 2;
    },
    'update' : function() { // Game loop
        if(mavis.dead){
            this.dead();
        }else{
            this.alive();
        }

    },
    'alive'  : function() {
        for(var i=0;i<trunks.length;i++){ 
            if(trunks[i].side == 'L'){
                if(trunks[i].x < 110 && trunks[i].sense == 1){
                    trunks[i].x = trunks[i].x + trunksIncrement
                    if(trunks[i].x >= 110)
                        trunks[i].sense = 0;
                }
                else if(trunks[i].x > 0 && trunks[i].sense == 0){
                    trunks[i].x = trunks[i].x - trunksIncrement
                    if(trunks[i].x <= 0)
                        trunks[i].sense = 1;
                }
            } else {
                if(trunks[i].x > 398 && trunks[i].sense == 1){
                    trunks[i].x = trunks[i].x - trunksIncrement
                    if(trunks[i].x <= 398)
                        trunks[i].sense = 0;
                }
                else if(trunks[i].x < 508 && trunks[i].sense == 0){
                    trunks[i].x = trunks[i].x + trunksIncrement
                    if(trunks[i].x >= 508)
                        trunks[i].sense = 1;
                }
            }
        }

        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            if (!mavis.spaceDown) {
                mavis.spaceDown = true;// Set the first frame animation to walking
                mavis.sprite.frame = 0;    
            }
            mavis.sprite.animations.play('walk', 10, true) // Start the animation walk


            bg1.y += 10;
            bg2.y += 10;
            grass1.y += 10;
            grass2.y += 10;

            for(var i=0;i<trunks.length;i++){ 
                trunks[i].y += 10;
                if(i%2 == 0 && trunks[i].y > 560 && !trunks[i].scored){
                    mavis.bones += 1;
                    trunks[i].scored = true
                }
            }

            if (bg1.y > 600){
                bg1.y = -580;
                grass1.y = -580;
            }

            if (bg2.y > 600){
                bg2.y = -580;
                grass2.y = -580;    
            }

        }else if(!this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))    {
            mavis.sprite.animations.stop('walk');
            mavis.spaceDown = false;
            mavis.sprite.frame = 1;
        }

        for (var i=0;i<trunks.length;i++){ 
            if(this.physics.arcade.collide(mavis.sprite, trunks[i])){
                mavis.dead = true;
            }
        }   

        if(mavis.dead){
            backgroundMusic.stop()
            mavis.sprite.frame = 2;
        }
    },
    'dead' : function(){
        
    }
}
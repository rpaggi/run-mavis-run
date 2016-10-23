var game = {};

game = function() {}

game.prototype = {
    'create' : function() { // Link all the loaded assets in game
        this.physics.startSystem(Phaser.Physics.ARCADE);

        bg1 = this.add.sprite(0, 0, 'bgGame');
        bg2 = this.add.sprite(0, -600, 'bgGame');

        grass1 = this.add.sprite(0, 0, 'bgGrass');
        grass2 = this.add.sprite(0, -600, 'bgGrass');

        trunkLeft1 = this.add.sprite(0, 400, 'trunkLeft');
        trunkLeft1.sense = 1
        trunkLeft1.side = 'L'
        trunkLeft1.scored = false;
        this.physics.enable(trunkLeft1, Phaser.Physics.ARCADE);        
        trunkRight1 = this.add.sprite(508, 400, 'trunkRight');
        trunkRight1.sense = 1
        trunkRight1.side = 'R'
        trunkRight1.scored = false;
        this.physics.enable(trunkRight1, Phaser.Physics.ARCADE);   

        trunkLeft2 = this.add.sprite(0, 200, 'trunkLeft');
        trunkLeft2.sense = 1
        trunkLeft2.side = 'L'
        trunkLeft2.scored = false;
        this.physics.enable(trunkLeft2, Phaser.Physics.ARCADE);        
        trunkRight2 = this.add.sprite(508, 200, 'trunkRight');
        trunkRight2.sense = 1
        trunkRight2.side = 'R'
        trunkRight2.scored = false;
        this.physics.enable(trunkRight2, Phaser.Physics.ARCADE); 

        trunkLeft3 = this.add.sprite(0, 0, 'trunkLeft');
        trunkLeft3.sense = 1
        trunkLeft3.side = 'L'
        trunkLeft3.scored = false;
        this.physics.enable(trunkLeft3, Phaser.Physics.ARCADE);        
        trunkRight3 = this.add.sprite(508, 0, 'trunkRight');
        trunkRight3.sense = 1
        trunkRight3.side = 'R'
        trunkRight3.scored = false;
        this.physics.enable(trunkRight3, Phaser.Physics.ARCADE);   

        trunkLeft4 = this.add.sprite(0, -200, 'trunkLeft');
        trunkLeft4.sense = 1
        trunkLeft4.side = 'L'
        trunkLeft4.scored = false;
        this.physics.enable(trunkLeft4, Phaser.Physics.ARCADE);        
        trunkRight4 = this.add.sprite(508, -200, 'trunkRight');
        trunkRight4.sense = 1
        trunkRight4.side = 'R'
        trunkRight4.scored = false;
        this.physics.enable(trunkRight4, Phaser.Physics.ARCADE);  

        lastTrunk = -200;     

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
        trunks = [trunkLeft1, trunkRight1, trunkLeft2, trunkRight2, trunkLeft3, trunkRight3, trunkLeft4, trunkRight4];    
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


            bg1.y     += 10;
            bg2.y     += 10;
            grass1.y  += 10;
            grass2.y  += 10;
            lastTrunk += 10;

            for(var i=0;i<trunks.length;i+=2){ 
                trunks[i+1].y = trunks[i].y += 10;
                if(i%2 == 0 && trunks[i].y > 560 && !trunks[i].scored){
                    mavis.bones += 1;
                    trunks[i].scored = true
                }

                if(trunks[i].y > 600){
                    random = (Math.random() * (121 - 11)) * -1;
                    trunks[i+1].y = trunks[i].y = -200 + random;
                    trunks[i].scored = false;
                }
            }

            if (bg1.y >= 600){
                bg1.y = -580;
                grass1.y = -580;
            }

            if (bg2.y >= 600){
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
            mavis.sprite.animations.stop('walk');
            backgroundMusic.stop()
            mavis.sprite.frame = 2;
        }

    },
    'dead' : function(){
        
    }
}
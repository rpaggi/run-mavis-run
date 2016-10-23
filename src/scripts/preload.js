var preload = {};

preload = function() {}

preload.prototype =  {
    'preload' : function(){
        this.load.onLoadStart.add(this.loadStart, this);
        this.load.onFileComplete.add(this.fileComplete, this);
        this.load.onLoadComplete.add(this.loadComplete, this);

        //Loading Menu assets
        this.load.spritesheet('bgMenu', 'assets/images/menu/bg.jpg', 800, 600, 2);
        this.load.spritesheet('btnStart', 'assets/images/menu/start-button.png', 460, 47, 2);
        this.load.audio('bgMusic', 'assets/musics/take_a_chance.mp3');        

        //Loading Game assets
        this.load.image('bgGame', 'assets/images/game/gameBg.jpg');
        this.load.image('bgGrass', 'assets/images/game/grass.png');
        this.load.image('trunkLeft', 'assets/images/game/trunkL.png');
        this.load.image('trunkRight', 'assets/images/game/trunkR.png');
        this.load.spritesheet('mavis', 'assets/images/game/mavis.png', 40, 60, 3);
        this.load.audio('backgroundMusic', 'assets/musics/pixel_peeker_polka.mp3');        
    },
    'loadStart' : function(){
        main.stage.backgroundColor = '#1e5915'; 
        text = main.add.text(32, 32, 'Loading...', { fill: '#ffffff' });
    },
    'fileComplete' : function(progress, cacheKey, success, totalLoaded, totalFiles){
        text.setText("Loading files progress: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
    },
    'loadComplete' : function(){
        text.setText("Load Complete");
        this.state.start('menu');
    }
}
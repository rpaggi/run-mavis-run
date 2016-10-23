
var main = new Phaser.Game(
	800, // width
	600, // height
	Phaser.AUTO,
	'Run-Mavis-Run'
);

main.state.add('menu', menu);
main.state.add('game', game);
main.state.start('menu')
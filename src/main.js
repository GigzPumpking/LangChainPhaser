import Play from './scenes/Play.js'; // Only import your own modules

const config = {
    type: Phaser.WEBGL,
    width: 960,
    height: 540,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            fps: 60
        }
    },
    scene: [Play], // Use the imported Play scene
};

const game = new Phaser.Game(config);

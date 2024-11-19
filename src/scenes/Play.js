export default class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        this.add.text(100, 100, 'Play Scene Loaded', { fontSize: '24px', fill: '#fff' });
    }

    update() {
        // Example logic for update
    }
}

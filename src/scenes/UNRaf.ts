import Phaser from 'phaser'
import {sharedInstance as Events} from './EventCenter'

export default class UNRaf extends Phaser.Scene{
    constructor () {
        super('intro');
    }

   
    preload ()
    {
              this.load.video('Unraf', 'assets/images/UNRaf/UNRaf SS/unraf2.mp4', 'loadeddata', false, true);                                          //UNRaf SS/

    }

    init()
    {
       
    }

    create ()
    {
        Events.emit('NoquieroMenu')
        Events.emit('Noquieroverelmenu')
        Events.emit('Noquieroverelmusica')
        Events.emit('Noquieroverelmenusonido')

        var vid = this.add.video(800, 450, 'Unraf');{
            vid.play(true);
            vid.setPaused(false);
            this.time.addEvent({
               delay: 2000,
                  callback: () => this.scene.start('inicio'),
                   callbackScope: this,
                   loop: false,
                 });  
        }

        this.loadFont('Pixel', 'assets/Font/upheavtt.ttf')

    }

    loadFont(name, url) {
        var newFont = new FontFace(name, `url("${url}")`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }

}
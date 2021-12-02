// import Phaser from 'phaser'

// export default class pausageneral extends Phaser.Scene

// {
//         private ImagenPausa;
//         private PausaPhysics = false;
//         private EscenaJuego;
//         private Resumir = false

// constructor()
// {
// super({key: 'PausaGeneral', active: true})
// }

// preload ()
// {
//     this.load.tilemapTiledJSON('PausaHUD', 'assets/Config HUD/HUDPAUSA.json')
//     //this.load.atlas();
    
//     this.load.spritesheet('PausaSprite', 'assets/Config HUD/pausasprite.png', {frameWidth: 95, frameHeight: 110})
// }

// create ()
// {   
//     const map = this.make.tilemap({ key: 'PausaHUD' });
//     const objectsLayer = map.getObjectLayer('Interactivo')
//      objectsLayer.objects.forEach(objData => {
//      const { x = 0, y = 0, name, width = 0, height = 0 } = objData

//         switch (name)
// 			{
//                 case 'PausaHUD':
//                     {
//                     this.ImagenPausa = (this.add.image(x, y, 'PausaSprite')) 
//                         .setFrame(0)
//                     this.ImagenPausa.setDisplaySize(width, height)
//                     this.ImagenPausa.setVisible(true)
//                     break
//                 }
//             }
//         })

//         this.ImagenPausa.setInteractive()
//         .on('pointerdown', () =>{
//             if (this.ImagenPausa.frame.name == 0) {
//                 this.ImagenPausa.setFrame(1)  
//                 this.PausaPhysics = (true)
//             }
//             else {
//                 this.ImagenPausa.setFrame(0)
//                 this.PausaPhysics = (false)
//                 //this.ImagenPausa.setVisible(true)
//             }
//         })
// }

//     PausaJuego(Escena)
//     {
    
//     if (this.PausaPhysics)
//     {
//         this.Resumir = false
//         Escena.scene.pause();
//     }

//     }

//     AgregarEscena(Escena)
//     {
//     this.EscenaJuego = Escena;
//     }

//     update(){
//         if (!this.PausaPhysics){
//             if (!this.Resumir && this.EscenaJuego){
//                 this.Resumir = true
//                 this.EscenaJuego.scene.resume()
//            }
//         }
//    }

// }

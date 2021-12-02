//import { Events } from 'matter'
import Phaser from 'phaser'
import {sharedInstance as Events} from './EventCenter'

export default class sonidogeneral extends Phaser.Scene

{
    //sonido colider
    private sonidocollider
    //sonido pesti
    private sonidopesti
    //SonidoClick
    private sonidoclick
    //Sonido Corazón
    private sonidocorazon
    private MusicaRepro;
    private MutearSonido = false;
    private MutearMusica = false;
    private Imagensonido;
    private Imagenmusica;
    private ImagenPausa;
    private PausaPhysics = false;
    private EscenaJuego;
    private Resumir = false
    private ImagenMenu;

constructor()
{
super({key: 'SonidosGeneral', active: true})
}

preload ()
{
    this.load.tilemapTiledJSON('MusicaHUD', 'assets/Config HUD/HUD.json')
    //this.load.atlas();
    
    this.load.spritesheet('SonidoSprite', 'assets/Config HUD/sonidosprite.png', {frameWidth: 120, frameHeight: 120})
    this.load.spritesheet('MusicaSprite', 'assets/Config HUD/musicasprite.png', {frameWidth: 120, frameHeight: 120})
    this.load.spritesheet('PausaSprite', 'assets/Config HUD/pausasprite.png', {frameWidth: 95, frameHeight: 110})
    this.load.spritesheet('MenuSprite', 'assets/Config HUD/MenuHud.png', {frameWidth: 120, frameHeight: 120})
}
create ()
{   
    //Menu
    Events.on('NoquieroMenu', this.NoquieroMenu, this)

    Events.on('QuieroMenu', this.QuieroMenu, this)

    //Pausa
    Events.on('Noquieroverelmenu', this.NoquieroPausa, this)

    Events.on('Quieroverelmenu', this.QuieroPausa, this)

    //evento musica
    Events.on('Noquieroverelmusica', this.NoquieroMusica, this)

    Events.on('Quieroverelmusica', this.QuieroMusica, this)

    //evento sonido

    Events.on('Noquieroverelmenusonido', this.NoquieroSonido, this)

    Events.on('Quieroverelmenusonido', this.QuieroSonido, this)


    const map = this.make.tilemap({ key: 'MusicaHUD' });
    const objectsLayer = map.getObjectLayer('interactivos')
     objectsLayer.objects.forEach(objData => {
     const { x = 0, y = 0, name, width = 0, height = 0 } = objData

        switch (name)
			{
				case 'SonidoHUD':
                    {
                        this.Imagensonido = (this.add.image(x, y, 'SonidoSprite')) 
                             .setFrame(0)
                            this.Imagensonido.setDisplaySize(width, height)
                            this.Imagensonido.setDataEnabled()
                             break
                             
                    }
                case 'MusicaHUD':
                    {
                        this.Imagenmusica = (this.add.image(x, y, 'MusicaSprite')) 
                             .setFrame(0)
                            this.Imagenmusica.setDisplaySize(width, height)
                            this.Imagenmusica.setDataEnabled()
                             break
                             
                    }
    
                case 'PausaHUD':
                    {
                    this.ImagenPausa = (this.add.image(x, y, 'PausaSprite')) 
                        .setFrame(0)
                    this.ImagenPausa.setDisplaySize(width, height)
                    this.ImagenPausa.setVisible(true)
                    this.ImagenPausa.setDataEnabled()
                    break
                }
                case 'MENUHUD':
                    {
                        this.ImagenMenu = (this.add.image(x, y, 'MenuSprite'))
                        .setFrame(0)
                        this.ImagenMenu.setDisplaySize(width, height)
                        this.ImagenMenu.setVisible(true)
                        this.ImagenMenu.setDataEnabled()
                        break
                    }
                }            
    })
    
    this.Imagenmusica.setInteractive()
    .on('pointerdown', () =>{
        if (this.Imagenmusica.frame.name == 0) {
            this.Imagenmusica.setFrame(1)
            this.Mute_Music(true)
        }
        else {
                this.Imagenmusica.setFrame(0)
                this.Mute_Music(false)
        }
     })

     this.Imagensonido.setInteractive()
    .on('pointerdown', () =>{
        if (this.Imagensonido.frame.name == 0) {
            this.Imagensonido.setFrame(1)
            this.SonidoFXMute(true)
        }
        else {
                this.Imagensonido.setFrame(0)
                this.SonidoFXMute(false)
        }
     })

     this.ImagenPausa.setInteractive()
     .on('pointerdown', () =>{
         if (this.ImagenPausa.frame.name == 0) {
             this.ImagenPausa.setFrame(1)  
             this.PausaPhysics = (true)
         }
         else {
             this.ImagenPausa.setFrame(0)
             this.PausaPhysics = (false)
         }
     })

     this.ImagenMenu.setInteractive()
     .on('pointerdown', () =>{
         if (this.ImagenMenu.frame.name == 0) {
             this.ImagenMenu.setFrame(1)
         }
         
         else {
                 this.ImagenMenu.setFrame(0)
         }

         Events.emit('salir')
      })
}

NoquieroMenu(this)
{
    this.ImagenMenu.data.set('show', false)
}

QuieroMenu(this)
{
    this.ImagenMenu.data.set('show', true)
}

NoquieroPausa(this)
{
    this.ImagenPausa.data.set('show', false)

}

QuieroPausa(this)
{
    this.ImagenPausa.data.set('show', true)

}

QuieroSonido(this)
{
    this.Imagensonido.data.set('show', true)
}

QuieroMusica(this)
{
    this.Imagenmusica.data.set('show', true)
}

NoquieroSonido(this)
{
    this.Imagensonido.data.set('show', false)
}

NoquieroMusica(this)
{
    this.Imagenmusica.data.set('show', false)
}

PausaJuego(Escena)
{
    
    if (this.PausaPhysics)
    {
        this.Resumir = false
        Escena.scene.pause();
    }

}

AgregarEscena(Escena)
{
    this.EscenaJuego = Escena;
}

//PARA MÚSICA
Sonido(MusicaGral)
{
    if(this.MusicaRepro){
        this.MusicaRepro.stop();
    }
    this.MusicaRepro = this.sound.add(MusicaGral, {volume: 0.1, loop: true});
    if(this.MutearMusica){
        this.MusicaRepro.pause();
    }
    else{
        this.MusicaRepro.play();
    }
}

Mute_Music(booleano)
{
    if(booleano){
        this.MutearMusica = true;
        if(this.MusicaRepro){
            this.MusicaRepro.pause();
        }
    }
    else{
        this.MutearMusica = false;
        if(this.MusicaRepro){
            if(this.MusicaRepro.isPaused){
                this.MusicaRepro.resume();
            }
            else{
                this.MusicaRepro.play();
            }
        }
        }
    }



SonidoStop()
{
this.MusicaRepro.stop()
}

//PARA FX
SonidoHearthON()
{
 if (!this.MutearSonido) {
    this.sonidocorazon = this.sound.add('vidita', {volume:0.1, loop:false})
    this.sonidocorazon.play()
}
}
//clik
SonidoClick()
{
if (!this.MutearSonido){
    this.sonidoclick = this.sound.add('clic', {volume:0.1, loop:false})
    this.sonidoclick.play()
}
}


//pestisound
Sonidopesti()
{
    if (!this.MutearSonido) {
        this.sonidopesti = this.sound.add('pesticidafx', {volume:0.1, loop:false})
        this.sonidopesti.play()
    }
}
//colliderchoquesound
SonidoCollider()
{
    if(!this.MutearSonido) {
        this.sonidocollider = this.sound.add('choquecoll', {volume: 0.1, loop:false})
        this.sonidocollider.play()
    }
}

SonidoFXMute(pararsonido)
{
    if (pararsonido) {
        this.MutearSonido = true
    }
    else {
        this.MutearSonido = false
    }
}

update(){
     if (!this.PausaPhysics){
         if (!this.Resumir && this.EscenaJuego){
             this.Resumir = true
             this.EscenaJuego.scene.resume()
        }
     }
     //Pausa
     if (this.ImagenPausa.data.values.show == false)
     {
         this.ImagenPausa.setVisible(false)
     }
     else
     {
        this.ImagenPausa.setVisible(true)
     }
     //Sonido
     if (this.Imagensonido.data.values.show == false)
     {
         this.Imagensonido.setVisible(false)
     }
     else
     {
        this.Imagensonido.setVisible(true)
     }
     //musica
     if (this.Imagenmusica.data.values.show == false)
     {
         this.Imagenmusica.setVisible(false)
     }
     else
     {
        this.Imagenmusica.setVisible(true)
     }

     //menu
     if (this.ImagenMenu.data.values.show == false)
     {
         this.ImagenMenu.setVisible(false)
     }
     else
     {
        this.ImagenMenu.setVisible(true)
     }
}

}
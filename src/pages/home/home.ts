import { Component, ViewChild } from '@angular/core';
import { Content, Platform } from 'ionic-angular';
import * as PIXI from 'pixi.js';
import "pixi-layers";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content : Content;

  constructor(public platform: Platform) {
  }

  ngAfterViewInit(){
    const WIDTH = this.platform.width();
    const HEIGHT = this.platform.height();

    var app = new PIXI.Application(WIDTH, HEIGHT, {backgroundColor : 0x1099bb, autoStart: true});
    this.content.getNativeElement().appendChild(app.view);

    var container = new PIXI.Container();

    var backgroundGroup = new PIXI.display.Group(0, true);
    var backgroundLayer = new PIXI.display.Layer(backgroundGroup);
    container.parentGroup = backgroundGroup;
    backgroundLayer.group.enableSort = true;
    container.addChild(backgroundLayer);
    
    //1280x800
    var backgroundTexture = PIXI.Texture.fromImage("assets/imgs/bg.png");
    var backgroundSprite = new PIXI.Sprite(backgroundTexture);
    backgroundSprite.width = WIDTH;
    backgroundSprite.height = HEIGHT;
    container.addChild(backgroundSprite);

    //900x1090
    var bambooContainer = new PIXI.Container();
    bambooContainer.parentGroup = backgroundGroup;
    var bambooCount = (WIDTH/900) <= 0 ? 1 : (WIDTH/900);

    for(var index = 0; index < bambooCount + 1; index++) {
      var texture = PIXI.Texture.fromImage("assets/imgs/bamboo.png");
      var sprite = new PIXI.Sprite(texture);
      sprite.on("update" ,function(data){
        this.position.x = (this.position.x + this.width - 1) < 0 ? WIDTH : this.position.x - 1;
      });
      sprite.position.x = (WIDTH / bambooCount) * index;
      sprite.width = WIDTH / bambooCount;
      sprite.height = HEIGHT;
      bambooContainer.addChild(sprite);
    }

    container.addChild(bambooContainer);

    var objectGroup = new PIXI.display.Group(1, true);
    var objectLayer = new PIXI.display.Layer(objectGroup);
    container.addChild(objectLayer);

    var groundContainer = new PIXI.Container();
    groundContainer.parentGroup = objectGroup;
    var groundCount = (WIDTH/220) <= 0 ? 1 : (WIDTH/220);

    for(var index = 0; index < groundCount + 1; index++) {
      var texture = PIXI.Texture.fromImage("assets/imgs/ground.png");
      var sprite = new PIXI.Sprite(texture);
      sprite.position.x = (WIDTH / groundCount) * index;
      sprite.position.y = HEIGHT - 90;
      sprite.width = WIDTH / groundCount;
      groundContainer.addChild(sprite);
    }
    
    container.addChild(groundContainer);

    var runContainer = new PIXI.Container();
    runContainer.parentGroup = objectGroup;

    var characterTexture = PIXI.BaseTexture.fromImage("assets/imgs/gang_run.png");
    var characterRunMotions = [];
    characterRunMotions.push
    (
      new PIXI.Texture(characterTexture, new PIXI.Rectangle(0, 0, 300, 350))
      , new PIXI.Texture(characterTexture, new PIXI.Rectangle(300, 0, 300, 350))
      , new PIXI.Texture(characterTexture, new PIXI.Rectangle(600, 0, 300, 350))
      , new PIXI.Texture(characterTexture, new PIXI.Rectangle(900, 0, 300, 350))
      , new PIXI.Texture(characterTexture, new PIXI.Rectangle(1200, 0, 300, 350))
      , new PIXI.Texture(characterTexture, new PIXI.Rectangle(1500, 0, 300, 350))
      , new PIXI.Texture(characterTexture, new PIXI.Rectangle(1800, 0, 300, 350))
    );
    var characterJumpTexture = PIXI.BaseTexture.fromImage("assets/imgs/gang_jump.png");
    var characterJumpMotions = [];
    characterJumpMotions.push
    (
      new PIXI.Texture(characterJumpTexture, new PIXI.Rectangle(0, 0, 300, 350))
      , new PIXI.Texture(characterJumpTexture, new PIXI.Rectangle(300, 0, 300, 350))
      , new PIXI.Texture(characterJumpTexture, new PIXI.Rectangle(300, 0, 300, 350))
      , new PIXI.Texture(characterJumpTexture, new PIXI.Rectangle(300, 0, 300, 350))
      , new PIXI.Texture(characterJumpTexture, new PIXI.Rectangle(300, 0, 300, 350))
      , new PIXI.Texture(characterJumpTexture, new PIXI.Rectangle(600, 0, 300, 350))
      , new PIXI.Texture(characterJumpTexture, new PIXI.Rectangle(900, 0, 300, 350))
    );

    var characterSprite = new PIXI.Sprite(characterRunMotions[0]);
    characterSprite.position.y = HEIGHT - 400;    
    characterSprite.position.x += 100;

    runContainer.addChild(characterSprite);

    var motionCount = 0;
    var isJump = false;  
    var isRun = true;

    var onClick = function(){
      if(isJump == true){
        return;
      }      

      app.ticker.stop();
      isJump = true;
      motionCount = 0;
      app.ticker.start();
    };

    window.onclick = onClick;
    
    container.addChild(runContainer);

    //var coinContainer = new PIXI.Container();
    var coinTexture = PIXI.Texture.fromImage("assets/imgs/coin.png");
    var coinEffectBaseTexture = PIXI.BaseTexture.fromImage("assets/imgs/coin_effect.png");
    var coinEffectTexture = [];
    coinEffectTexture.push
    (
      new PIXI.Texture(coinEffectBaseTexture, new PIXI.Rectangle(0, 0, 200, 200))
      , new PIXI.Texture(coinEffectBaseTexture, new PIXI.Rectangle(0, 0, 200, 200))
      , new PIXI.Texture(coinEffectBaseTexture, new PIXI.Rectangle(0, 0, 200, 200))
      , new PIXI.Texture(coinEffectBaseTexture, new PIXI.Rectangle(0, 0, 200, 200))
      , new PIXI.Texture(coinEffectBaseTexture, new PIXI.Rectangle(0, 0, 200, 200))
      , new PIXI.Texture(coinEffectBaseTexture, new PIXI.Rectangle(200, 0, 200, 200))
      , new PIXI.Texture(coinEffectBaseTexture, new PIXI.Rectangle(200, 0, 200, 200))
      , new PIXI.Texture(coinEffectBaseTexture, new PIXI.Rectangle(200, 0, 200, 200))
      , new PIXI.Texture(coinEffectBaseTexture, new PIXI.Rectangle(200, 0, 200, 200))
      , new PIXI.Texture(coinEffectBaseTexture, new PIXI.Rectangle(200, 0, 200, 200))
      , new PIXI.Texture(coinEffectBaseTexture, new PIXI.Rectangle(400, 0, 200, 200))
      , new PIXI.Texture(coinEffectBaseTexture, new PIXI.Rectangle(400, 0, 200, 200))
      , new PIXI.Texture(coinEffectBaseTexture, new PIXI.Rectangle(400, 0, 200, 200))
      , new PIXI.Texture(coinEffectBaseTexture, new PIXI.Rectangle(400, 0, 200, 200))
      , new PIXI.Texture(coinEffectBaseTexture, new PIXI.Rectangle(400, 0, 200, 200))
    );
    var coins = [];


    app.stage.addChild(container);
    
    var coinCount = 0;

    app.ticker.add(function(delta) {

      coinCount = (coinCount + delta);

      if(coinCount > 180) {
        
        var coin = new PIXI.Sprite(coinTexture);
        coins.push(coin);
        coin.position.x = WIDTH - 180;
        coin.position.y = HEIGHT - 90 - 180 - (Math.random() * 700);
        container.addChild(coin);

        coinCount = 0;
      }

      bambooContainer.children.forEach(function(displayObject, index){
        displayObject.emit("update", {
          delta: delta
        });
      });

      coins.forEach(function(element, index){
        element.position.x -= delta * 10;

        var coin = element.getBounds();
        var character = characterSprite.getBounds();

        if( character.x <= coin.x && coin.x <= (character.x + character.width) / 2 
        && (coin.y >= character.y)  && coin.y <= (character.y + character.height)
        ) {
          if(element.texture == coinTexture) {
            element.texture = coinEffectTexture[0];
            return;
          }
        }

        if(element.texture != coinTexture) {
          for(var effectIndex = 0; effectIndex < coinEffectTexture.length; effectIndex++) {
            if(element.texture == coinEffectTexture[effectIndex]) {
              if((effectIndex + 1) == coinEffectTexture.length) {
                container.removeChild(element);
                coins.splice(index, 1);
                break;
              }
              
              element.texture = coinEffectTexture[effectIndex + 1];
              break;
            }
          }
        }

        if(coin.x + coin.width < 0){
          coins.splice(index, 1);
        }
      });

      var count = 0;

      if(isJump == true){
        count = characterJumpMotions.length;
      }
      else if(isRun == true) {
        count = characterRunMotions.length;
      }

      var fps = isJump == true ? 8 : 10;

      motionCount = (motionCount + 1) % (fps * count);

      if((motionCount % fps) == 0) {
        if(isRun == true) {
          characterSprite.texture = characterRunMotions[(motionCount / fps)];
        }
        if(isJump == true){
          characterSprite.texture = characterJumpMotions[(motionCount / fps)];
        }
      }

      if(isJump == true){
        if(motionCount == 0){
          isJump = false;
          isRun = true;
          return;
        }

        if(motionCount % fps  == 0) {
          if(motionCount / fps < characterJumpMotions.length / 2) {
            characterSprite.position.y -= 150;
          }
          else {
            characterSprite.position.y += 150;
          }
        }
      }
    });
  }

  
}

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
        this.position.x = (this.position.x + this.width - data.delta) < 0 ? WIDTH : this.position.x - data.delta;
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

    var charicTexture = PIXI.BaseTexture.fromImage("assets/imgs/gang_run.png");
    var charicRunMotions = [];
    charicRunMotions.push
    (
      new PIXI.Texture(charicTexture, new PIXI.Rectangle(0, 0, 300, 350))
      , new PIXI.Texture(charicTexture, new PIXI.Rectangle(300, 0, 300, 350))
      , new PIXI.Texture(charicTexture, new PIXI.Rectangle(600, 0, 300, 350))
      , new PIXI.Texture(charicTexture, new PIXI.Rectangle(900, 0, 300, 350))
      , new PIXI.Texture(charicTexture, new PIXI.Rectangle(1200, 0, 300, 350))
      , new PIXI.Texture(charicTexture, new PIXI.Rectangle(1500, 0, 300, 350))
      , new PIXI.Texture(charicTexture, new PIXI.Rectangle(1800, 0, 300, 350))
    );
    var charicTexture = PIXI.BaseTexture.fromImage("assets/imgs/gang_jump.png");
    var charicJumpMotions = [];
    charicJumpMotions.push
    (
      new PIXI.Texture(charicTexture, new PIXI.Rectangle(0, 0, 300, 350))
      , new PIXI.Texture(charicTexture, new PIXI.Rectangle(300, 0, 300, 350))
      , new PIXI.Texture(charicTexture, new PIXI.Rectangle(600, 0, 300, 350))
      , new PIXI.Texture(charicTexture, new PIXI.Rectangle(900, 0, 300, 350))
    );

    var charicSprite = new PIXI.Sprite(charicRunMotions[0]);
    charicSprite.position.y = HEIGHT - 400;    

    runContainer.addChild(charicSprite);


    var motionCount = 0;
    var isJump = false;  

    var onClick = function(){
      if(isJump == true){
        return;
      }      
      
      motionCount = 0;
      isJump = true;
    };

    window.onclick = onClick;
    
    container.addChild(runContainer);
    app.stage.addChild(container);

    app.ticker.add(function(delta) {
      bambooContainer.children.forEach(function(displayObject, index){
        displayObject.emit("update", {
          delta: delta
        });
      });

      var motions = [];

      if(isJump == true){
        motionCount = 0;
        motions = charicJumpMotions;

        if(motions === charicJumpMotions && (motionCount / 5 < 2)){
          charicSprite.position.y -= 100;
        }
        else if(motions === charicJumpMotions && (motionCount / 5 > 2)){
          charicSprite.position.y += 100;
        }

        if((motionCount % 10) == 0){
          charicSprite.texture = motions[(motionCount / 10)];
        }
        
        if(motions === charicJumpMotions && motionCount / (10 * motions.length) == 0){
          motionCount = 0;
          isJump = false;
        }
      }
      else {
        motions = charicRunMotions;
      }

      motionCount = (motionCount + 1) % (10 * motions.length);



      if((motionCount % 10) == 0){
        charicSprite.texture = motions[(motionCount / 10)];
      }


    });
  }

  
}

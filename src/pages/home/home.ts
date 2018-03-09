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
    app.stage.addChild(container);

    app.ticker.add(function(delta) {
      bambooContainer.children.forEach(function(displayObject, index){
        displayObject.emit("update", {
          delta: delta
        });
      });
    });
  }

  
}

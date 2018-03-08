import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import * as PIXI from 'pixi.js';
import "pixi-layers";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content : Content;

  constructor() {
  }

  ngAfterViewInit(){
    var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x1099bb, autoStart: true});
    this.content.getNativeElement().appendChild(app.view);
    var container = new PIXI.Container();
    app.stage.addChild(container);

    var group = new PIXI.display.Group(0, true);
    app.stage.addChild(new PIXI.display.Layer(group));
    
    var bg = new PIXI.Sprite(PIXI.RenderTexture.fromImage('assets/imgs/bg.png'));
    bg.parentGroup = group;

    container.addChild(bg);   

    // // Listen for animate update
    // app.ticker.add(function(delta) {
    //     // just for fun, let's rotate mr rabbit a little
    //     // delta is 1 if running at 100% performance
    //     // creates frame-independent transformation
    //     bunny.rotation += 0.1 * delta;
    // });

  }

  
}

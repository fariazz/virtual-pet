//set main namespace
goog.provide('virtual_pet');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('virtual_pet.Pet');
goog.require('virtual_pet.Item');

// entrypoint
virtual_pet.start = function(){
    //object to store game-level properties
    var gameObj = {
        width: 320,
        height: 480,
        renderer: lime.Renderer.DOM,
        maxPetSize: 200,
        items: []
    };
    
    var director = new lime.Director(document.body,gameObj.width,gameObj.height);
    var gameScene = new lime.Scene().setRenderer(gameObj.renderer)
    var gameLayer = new lime.Layer();
    
    var background = new lime.Sprite().setSize(gameObj.width,gameObj.height*4/5).
        setFill('#F3E2A9').setAnchorPoint(0,0).setPosition(0,0);
    
    goog.events.listen(background, ['touchstart', 'mousedown'], function(e) {
        if(gameObj.currentItem) {
            var pos = e.position;
            var newItem = new virtual_pet.Item(gameObj.currentItem.happiness,gameObj.currentItem.health)
                .setPosition(pos)
                .setSize(gameObj.currentItem.width, gameObj.currentItem.height)
                .setFill(gameObj.currentItem.fill);
            gameLayer.appendChild(newItem);
            gameObj.items.push(newItem);    
            
            var movement = new lime.animation.MoveTo(e.position.x,e.position.y).setDuration(2);
            pet.runAction(movement);            
            
            gameObj.currentItem = null;
        }
    });
    
    var menuArea = new lime.Sprite().setSize(gameObj.width,gameObj.height/5).
        setFill('#8B5A00').setPosition(gameObj.width/2,gameObj.height*9/10)
    
    var appleButton = new lime.Sprite().setSize(gameObj.height/10,gameObj.height/10).
        setPosition(gameObj.width/4,gameObj.height*9/10).setFill('images/apple.png');
    
    goog.events.listen(appleButton, ['touchstart', 'mousedown'], function(e) {
        e.stopPropagation();
        gameObj.currentItem = {
            width: gameObj.height/10,
            height: gameObj.height/10,
            fill: 'images/apple.png',
            happiness: -5,
            health: 20
        };
    });
    
    var icecreamButton = new lime.Sprite().setSize(gameObj.height/20,gameObj.height/10).
        setPosition(gameObj.width/2,gameObj.height*9/10).setFill('images/icecream.png');
    
    goog.events.listen(icecreamButton, ['touchstart', 'mousedown'], function(e) {
        e.stopPropagation();
        gameObj.currentItem = {
            width: gameObj.height/20,
            height: gameObj.height/10,
            fill: 'images/icecream.png',
            happiness: 20,
            health: -10
        };
    });
    
    var toyButton = new lime.Sprite().setSize(gameObj.height/15,gameObj.height/10).
        setPosition(gameObj.width*3/4,gameObj.height*9/10).setFill('images/toy.png');
    
    goog.events.listen(toyButton, ['touchstart', 'mousedown'], function(e) {
        e.stopPropagation();
        gameObj.currentItem = {
            width: gameObj.height/15,
            height: gameObj.height/10,
            fill: 'images/toy.png',
            happiness: 10,
            health: 0
        };
    });
    
    gameLayer.appendChild(background);    
    gameLayer.appendChild(menuArea);    
    gameLayer.appendChild(appleButton);    
    gameLayer.appendChild(icecreamButton);    
    gameLayer.appendChild(toyButton);    
    gameScene.appendChild(gameLayer);
    
    //create pet
    var pet = new virtual_pet.Pet(gameObj, gameLayer);
    gameLayer.appendChild(pet);
    
    director.makeMobileWebAppCapable();
    director.replaceScene(gameScene);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('virtual_pet.start', virtual_pet.start);

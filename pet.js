goog.provide('virtual_pet.Pet');
goog.require('lime.Circle');

virtual_pet.Pet = function(gameObj, gameLayer) {
    goog.base(this);
    
    this.gameObj = gameObj;
    this.gameLayer = gameLayer;
    this.happiness = 100;
    this.health = 100;
        
    this.setPosition(this.gameObj.width/2, this.gameObj.height/2);
    this.updateLook();
    
    var dt = 100;
    var i, arrayLen, toRemove;
    lime.scheduleManager.scheduleWithDelay(function() {
        this.happiness -= 0.2;
        this.health -= 0.1;
        
        //console.log('happiness:'+this.happiness);
        //console.log('health:'+this.health);
        
        //game over
        if(this.happiness <= 0 || this.health <= 0) {
            //alert('Game over!');       
            location.reload(); 
        }

        //check for collision with items   
        toRemove = new Array();
        for(i = 0, arrayLen = this.gameObj.items.length; i<arrayLen; i++) {
            if(goog.math.Box.intersects(this.gameObj.items[i].getBoundingBox(), this.getBoundingBox())) {
                this.happiness = Math.min(this.happiness+this.gameObj.items[i].happiness,100);
                this.health = Math.min(this.health+this.gameObj.items[i].health,100);
                toRemove.push(i);
            }
        }
        
        //remove picked up items        
        for(i = toRemove.length; i > 0; i--) {
            this.gameLayer.removeChild(this.gameObj.items[toRemove[i-1]]);
            this.gameObj.items.splice(toRemove[i-1],1);
        }
        this.updateLook();
    }, this, dt);
    
    //drag it around to make it happier
    goog.events.listen(this,['mousedown','touchstart'],function(e){
        e.startDrag(true);
        
        var pet = this;
        e.swallow(['mouseup','touchend'],function(){
            this.happiness = Math.min(this.happiness+5,100);
        });
    });
    

    
};

goog.inherits(virtual_pet.Pet,lime.Circle);

/**
 * update the pet's look according to it's happiness and health
 */
virtual_pet.Pet.prototype.updateLook = function() {
    //size of the pet according to the health
    var petSize = this.gameObj.maxPetSize * this.health/100;
    this.setSize(petSize, petSize);
    
    //color according to the happiness (between green and red)
    var redAmount = parseInt((100-this.happiness)/100*255); //255 if 0 health
    var greenAmount = parseInt((this.happiness)/100*255); //255 if 100 health
    this.setFill(redAmount,greenAmount, 0);
};


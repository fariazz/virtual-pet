goog.provide('virtual_pet.Item');

virtual_pet.Item = function(happiness, health) {
    goog.base(this);
    
    this.happiness = happiness;
    this.health = health;    
}

goog.inherits(virtual_pet.Item,lime.Sprite);

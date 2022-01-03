# simple-particles-text-anim

To add a text particle in a html div for example: 
```HTML
<div id="canvas2"></div>
```
you should use the `TextParticle` class as follows:
```JS
let particles = new TextParticle('#canvas2', options)
particles.run()
```
'options' est un objet d'option structuré comme suit:
```JS
/*
* @param{String} id - the id of the canvas container
* @param{Object} options - animation options
* @param{String} options.text - the text to animate
* @param{String} options.family - font-family of the text
* @param{String} options.color - color of particles
* @param{Number} options.font - font-size of the text
* @param{Number} options.width - width of the canvas zone
* @param{Number} options.height - height of the canvas zone
* @param{Number} options.mouseRadius - radius of the circle around the mouse
* @param{Number} options.scale
* @param{Number} options.particleSize
* @param{Object} options.ajustProsition
* @param{Number} options.ajustProsition.x
* @param{Number} options.ajustProsition.y
* @param{Number} options.speed
* @param{String} options.canvasDelimitation
* @param{Object} options.initialAnim
* @param{Number} options.initialAnim.x
* @param{Number} options.initialAnim.y
*/
```

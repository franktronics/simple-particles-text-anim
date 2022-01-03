
class Particles{
    /**
     * @param{Number} x - X position of particle
     * @param{Number} y - Y position of particle
     * @param{Number} size - size of particle
     * @param{String} color
     */
    constructor(elt, ctx ,x, y, size, color, radius, speed, initialAnim){
        this.elt = elt
        this.ctx = ctx
        this.x = initialAnim !== undefined && initialAnim.x > 0? Math.random() * initialAnim.x: x
        this.y = initialAnim !== undefined && initialAnim.y > 0? Math.random() * initialAnim.y: y
        this.size = (size > 0? size: 1)
        this.color = color
        this.mouse = {
            x: null,
            y: null,
            radius: radius
        }
        this.speed = (speed > 1? speed: 1)
        this.initialX = x
        this.initialY = y
        this.density = (Math.random() * 30) + 1
    }
    draw(){
        this.ctx.fillStyle = this.color
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        this.ctx.closePath()
        this.ctx.fill()
    }
    update(){
        let dx = this.mouse.x - this.x
        let dy = this.mouse.y - this.y
        let distance = Math.sqrt(dx*dx + dy*dy)

        let newX = dx / distance
        let newY = dy / distance
        let k = (this.mouse.radius - distance) / this.mouse.radius
        let directionX = newX * (k < 0? k: k*1.5) * this.density
        let directionY = newY * (k < 0? k: k*1.5) * this.density
        if(distance < this.mouse.radius){
            this.x -= directionX
            this.y -= directionY
        }else{
            if(this.x !== this.initialX){
                let dx = this.x - this.initialX
                this.x -= dx/this.speed
            }
            if(this.y !== this.initialY){
                let dy = this.y - this.initialY
                this.y -= dy/this.speed
            }
        }
    }
    updateMouse(x, y){
        this.mouse.x = x
        this.mouse.y = y
    }
}

class TextParticle{
    /**
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
    constructor(id, options){
        this.id = id
        this.elt = document.querySelector(id)
        this.options = options
        this.canvas = null
        this.ctx = null
        this.textData = null
        this.mouse = {
            x: -this.options.mouseRadius,
            y: -this.options.mouseRadius,
            radius: ((this.options.mouseRadius > 0 && this.options.mouseRadius !== undefined)? this.options.mouseRadius: 30)
        }
        this.particles = []
        if(this.elt !== null){
            this.buildStyle()
            this.buildElt()
        }
    }

    buildStyle(){
        this.elt.innerHTML = "<canvas></canvas>"
        this.elt.style.display = 'block'
        this.elt.style.width = `${this.options.width}px`
        this.elt.style.height = `${this.options.height}px`
        this.elt.style.overflow = 'hidden'
    }
    buildElt(){
        /*initialization of the canvas*/
        this.canvas = this.elt.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = this.options.width
        this.canvas.height = this.options.height
        /*initialization of the canvas // end*/
        const that = this
        that.elt.addEventListener('mousemove', function(e){
            e.preventDefault()
            that.mouse.x = e.offsetX
            that.mouse.y = e.offsetY
        })
        that.elt.addEventListener('mouseout', function(e){
            that.mouse.x = -that.mouse.radius
            that.mouse.y = -that.mouse.radius
        })
        this.ctx.fillStyle = '#fff'
        this.ctx.font = `${this.options.font}px ${this.options.family}`
        this.ctx.fillText((this.options.text !== undefined?this.options.text:''), 0, this.options.font)
        this.textData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        this.initialisation()
    }
    initialisation(){
        this.particles = []
        for(let y = 0; y < this.textData.height; y++){
            for(let x = 0; x < this.textData.width; x++){
                if(this.textData.data[((y * 4 * this.textData.width) + (x * 4) + 3)]){
                    let posX = x + this.options.ajustProsition.x
                    let posY = y + this.options.ajustProsition.y
                    this.particles.push(new Particles(this.elt ,
                        this.ctx, 
                        posX * this.options.scale, 
                        posY * this.options.scale, 
                        this.options.particleSize, 
                        this.options.color, 
                        this.mouse.radius,
                        this.options.speed,
                        this.options.initialAnim))
                }
            }
        }
    }
    run(){
        window.setInterval(() => {
            this.animate(this)
        }, 1)
    }
    animate(ob){
        ob.ctx.clearRect(0, 0, ob.canvas.width, ob.canvas.height)
        
        if(ob.options.canvasDelimitation !== undefined && ob.options.canvasDelimitation !== null){
            ob.ctx.strokeStyle = ob.options.canvasDelimitation
            ob.ctx.strokeRect(0, 0, ob.canvas.width, ob.canvas.height)
        }
        ob.particles.forEach(p => {
            p.updateMouse(ob.mouse.x, ob.mouse.y)
            p.draw()
            p.update()
        })
    }
    
}
///////////////////////////////////
const options = {
    text: 'Franklin',
    family: 'Verdana',
    color: '#00f',
    font: 60,
    width: 1000,
    height: 200,
    mouseRadius: 100,
    scale: 3,
    particleSize: 1,
    ajustProsition: {
        x: 0,
        y: 0
    },
    speed: 20,
    canvasDelimitation: '#ff0',
    initialAnim:{
        x: 1000,
        y: 200
    }
}

let c = new TextParticle('#canvas2', options)
c.run()
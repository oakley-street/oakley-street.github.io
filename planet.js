class Planet {
    constructor(mass, position, velocity, planets, scale) {
        this.mass = mass;
        this.position = position;
        this.planets = planets;
        this.velocity = velocity;
        this.scale = scale;
        this.control = false;
        this.forces = [];
    }

    add(planets) {
        for (planet of planets) {
            this.planets.push(planet);
        }
    }

    draw() {
        if (this.control == true) {
            stroke(244,160,0);
            line(this.position.x, this.position.y, this.position.x+p5.Vector.mult(this.velocity, this.mass).x+(this.velocity.x*10), this.position.y+p5.Vector.mult(this.velocity, this.mass).y+(this.velocity.y*10));
            stroke(15,157,88);
            let force = createVector(0, 0);
            for (force of this.forces) {
                line(this.position.x, this.position.y, this.position.x+p5.Vector.mult(this.force, this.mass).x+(force.x*10), this.position.y+p5.Vector.mult(this.force, this.mass).y+(force.y*10));
            }
            stroke(66,133,244);
            fill(66,133,244);
            ellipse(this.position.x, this.position.y, this.mass, this.mass);
        } else {
            noStroke();
            fill(255);
            if (this.position.x > 800-this.mass) {
                ellipse(this.position.x-800, this.position.y, this.mass, this.mass);
            } else if (this.position.x < this.mass) {
                ellipse(this.position.x+800, this.position.y, this.mass, this.mass);
            } 
            if (this.position.y > 800-this.mass) {
                ellipse(this.position.x, this.position.y-800, this.mass, this.mass);
            } else if (this.position.y < this.mass) {
                ellipse(this.position.x, this.position.y+800, this.mass, this.mass);
            } 
            ellipse(this.position.x, this.position.y, this.mass, this.mass);
        }
    }

    apply() {
        this.forces = []
        this.force = createVector(0, 0);
        let count = 0;
        for (planet of this.planets) {
            let magnitude = this.scale * ((this.mass * planet.mass)) // (p5.Vector.dist(this.position, planet.position) ^ 2));
            let current = p5.Vector.sub(planet.position, this.position); 
            current.setMag(magnitude);
            this.force.add(current);
            /*if (Math.abs(this.position.dist(planet.position)) <= planet.mass+this.mass) {
                this.velocity.rotate(180);
                current = this.velocity;
            }*/
            count++;
            this.forces.push(current);
            
        }
        if (count > 0) {
            this.force.div(count+1);
        }
    }

    move() {
        this.wrap();
        this.velocity.add(this.force.div(this.mass));
        this.force.mult(0);
        this.position.set(this.position.add(this.velocity));
    }

    wrap() {
        if (this.position.x >= 800+this.mass) {
            this.position.x = this.position.x-800;
        } else if (this.position.x <= -this.mass) {
            this.position.x = this.position.x+800;
        } 
        if (this.position.y >= 800+this.mass) {
            this.position.y = this.position.y-800;
        } else if (this.position.y <= -this.mass) {
            this.position.y = this.position.y+800;
        } 
    }
}

var planets = [];
function setup() {
    createCanvas(800, 800);
    angleMode(DEGREES);
    for (i = 0; i < 10; i++) {
        let position = createVector(random(800), random(800));
        let velocity = createVector(random(-1, 1), random(-1, 1));
        let mass = random(10, 20);
        planets.push(new Planet(mass, position, velocity, [], 0.5));
    }
    for (planet of planets) {
        planet.add(planets);
    }
}

function mousePressed() {
    let found = false;
    for (planet of planets) {
        planet.control = false;
        if (planet.position.dist(createVector(mouseX, mouseY)) < planet.mass && found == false) {
            control = planets.indexOf(planet);
            planets[control] = planets[0];
            planets[0] = planet;
            planet.control = true;
            found = true;
        } 
    }
}

function draw() {
    background(64);
    for (planet of planets) {
        planet.apply();
    }
    
    for (planet of planets) {
        planet.move();
        planet.draw();
    }
}

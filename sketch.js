let elevation = -300
let gravity = 5
let speed = 0.025
let floor = 190
let frontOfGrass = 250
let backOfGrass = -250
let leftCorner = -230
let rightCorner = 230
let toTopOfTree = 100
let stars = []
let grassImage
let moonImage
let treeImage
let leavesImage
let windowImage

function preload() {
  grassImage = loadImage('grass.png')
  moonImage = loadImage('moon.png')
  treeImage = loadImage('tree.png')
  leavesImage = loadImage('leaves.png')
}

function setup() {
  createCanvas(700, 700, WEBGL)
  noStroke()
  for (var i = 0; i < 500; i++) {
    stars[i] = new Star();
  }
}

function draw() {
  background('#0D0D23');
  directionalLight(255, 255, 255, 1, 1, -1)
  pointLight(255, 255, 255, 0, elevation - 30, 0)
  drawGround()
  drawMoon()
  drawTree(rightCorner, backOfGrass)
  drawTree(leftCorner, backOfGrass)
  drawTree(rightCorner, frontOfGrass)
  drawTree(leftCorner, frontOfGrass)
  drawUfo()
  drawStars()
  gravity -= speed
  elevation += gravity
  if (elevation >= floor) {
    noLoop()
  }
}

function drawGround() {
  push()
  texture(grassImage)
  spotLight(255, 255, 255, 0, elevation, 0, 0, 1, 0, Math.PI / 6, 3)
  translate(0, 200, 0)
  rotateX(Math.PI / 2)
  plane(900, 550)
  pop()
}

function drawUfo() {
  push()
  rotateY(millis() / 1000)
  translate(0, elevation, 0)
  scale(1, 0.25, 1)
  specularMaterial('lightblue')
  sphere(80)
  ambientMaterial('#0A0AEC')
  scale(1, 1.2, 1)
  translate(0, -50, 0)
  cylinder(60, 30)
  specularMaterial('lightblue')
  scale(1, 0.5, 1)
  translate(0, -50, 0)
  sphere(65)
  ambientMaterial('gray')
  scale(1, 1.5, 1)
  translate(0, -40, 0)
  sphere(20)
  translate(0, 230, 0)
  scale(1, 1, 1)
  emissiveMaterial('white')
  sphere(10)
  pop()
}

function drawMoon() {
  push()
  texture(moonImage)
  translate(300, -300, -170)
  sphere(50)
  pop()
}

function drawTree(x, z) {
  push()
  texture(treeImage)
  translate(x, floor, z)
  cylinder(40, 300)
  texture(leavesImage)
  translate(0, -130, 1)
  sphere(75, 100)
  translate(0, -100, 1)
  sphere(75, 100)
  pop()
}

class Star {
  constructor() {
    this.x = (Math.random() * 1200) - 600
    this.y = (Math.random() * 1000) - 600
    this.size = random(1, 7)
    this.t = random(TAU)
  }

  draw() {
    this.t += 0.1
    let size = this.size + sin(this.t)
    noStroke()
    push()
    translate(0, 0, -400)
    circle(this.x, this.y, size)
    pop()
  }
}

function drawStars() {
  for (var i = 0; i < stars.length; i++) {
    stars[i].draw();
  }
}

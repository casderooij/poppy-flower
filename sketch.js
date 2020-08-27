class FlowerHead {
  constructor({
    pos,
    flowerHeadScale,
    flowerHeadSmallLeafCount,
    flowerHeadBigLeafCount
  }) {
    this.location = pos;

    this.flowerHeadScale = flowerHeadScale;

    this.stalkColor = color(0, 0, 255);

    this.smallLeafCount = flowerHeadSmallLeafCount;
    this.smallLeafHeight = 12;
    this.smallLeafWidth = 10;
    this.smallLeafOffset = this.smallLeafHeight - 2;
    this.smallLeafResolution = PI * 2 / 9;
    this.smallLeafRandomness = 8;
    this.smallLeafsRotation = (PI * 2) * random();

    this.bigLeafCount = flowerHeadBigLeafCount;
    this.bigLeafHeight = 22;
    this.bigLeafWidth = 18;
    this.bigLeafOffset = this.bigLeafHeight - 4;
    this.bigLeafResolution = PI * 2 / 10;
    this.bigLeafRandomness = 12;
    this.bigLeafsRotation = (PI * 2) * random();

    this.flowerCenterRadius = 6;
    this.flowerCenterRotation = (PI * 2) * random();
    this.flowerCenterResolution = PI * 2 / 8;
  }

  draw() {
    push();
    translate(this.location.x, this.location.y);
    
    stroke(255);
    
    let c = random(0, 100);

    push();
    for (let i = 0; i < this.bigLeafCount; i++) {
      const rotation = (PI / (this.bigLeafCount / 2)) * i;
      push();
      rotate(rotation + this.bigLeafsRotation);
      this.drawBigLeaf(c);
      pop();
      c += 0.1;
    }
    pop();

    push();
    for (let i = 0; i < this.smallLeafCount; i++) {
      const rotation = (PI / (this.smallLeafCount / 2)) * i;
      push();
      rotate(rotation + this.smallLeafsRotation);
      this.drawSmallLeaf(c);
      pop();
      c += 0.1;
    }
    pop();
    
    
    this.drawFlowerCenter();
    pop();
  }

  drawBigLeaf(c) {
    fill(255, map(noise(c), 0, 1, 0, 180), map(noise(c), 0, 1, 0, 180));
    let xOff = random(0, 100);
    beginShape();
    for (let i = 0; i < PI * 2; i += this.bigLeafResolution) {
      const r = map(noise(xOff), 0, 1, -this.bigLeafRandomness, this.bigLeafRandomness);
      const x = (this.bigLeafOffset - cos(i) * this.bigLeafWidth + r) * this.flowerHeadScale;
      const y = (-sin(i) * this.bigLeafHeight + r) * this.flowerHeadScale;
      vertex(x, y);
      xOff += 0.2;
    }
    endShape(CLOSE);
  }

  drawSmallLeaf(c) {
    fill(255, map(noise(c), 0, 1, 0, 180), map(noise(c), 0, 1, 0, 180));
    let xOff = random(0, 100);
    beginShape();
    for (let i = 0; i < PI * 2; i += this.smallLeafResolution) {
      const r = map(noise(xOff), 0, 1, -this.smallLeafRandomness, this.smallLeafRandomness);
      const x = (this.smallLeafOffset - cos(i) * this.smallLeafWidth + r) * this.flowerHeadScale;
      const y = (-sin(i) * this.smallLeafHeight + r) * this.flowerHeadScale;
      vertex(x, y);
      xOff += 0.1;
    }
    endShape(CLOSE);
  }

  drawFlowerCenter() {
    fill(this.stalkColor);
    rotate(this.flowerCenterRotation);
    beginShape();
    for (let i = 0; i < PI * 2; i += this.flowerCenterResolution) {
      const x = (cos(i) * this.flowerCenterRadius) * this.flowerHeadScale;
      const y = (sin(i) * this.flowerCenterRadius) * this.flowerHeadScale;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}


class YoungFlowerhead {
  constructor({
    pos,
    angle,
  }) {
    this.pos = pos;
    this.angle = angle;

    this.flowerBudResolution = TWO_PI / 10;
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle - PI / 2);

    stroke(255);
    fill(0, 0, 255);
    beginShape();
    for (let i = 0; i < TWO_PI; i += this.flowerBudResolution) {
      const x = cos(i) * 4;
      const y = -8 - sin(i) * 8;
      vertex(x, y);
    }
    endShape(CLOSE);

    pop();
  }
}


class FlowerSeedPod {
  constructor({
    pos,
    angle
  }) {
    this.pos = pos;
    this.angle = angle;

    this.flowerSeedPodResolution = TWO_PI / 12;
    this.flowerSeedPodCrownSize = 8;
    this.flowerSeedPodCrownPosition = 21;
    this.flowerSeedPodCrownRotationOffset = random();
    this.flowerSeedPodCrownResolution = 0.7;
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle - PI / 2);

    stroke(255);
    fill(0, 0, 255);

    beginShape();
    for (let i = 0; i < TWO_PI; i += 1.1) {
      const x = cos(i) * 4;
      const y = 3 + sin(i) * 4;
      vertex(x, y);
    }
    endShape(CLOSE);
    
    beginShape();
    for (let i = 0; i < TWO_PI; i += this.flowerSeedPodResolution) {
      const x = cos(i) * 8;
      const y = 14 + sin(i) * 10;
      vertex(x, y);
    }
    endShape(CLOSE);
    
    strokeWeight(5);
    for (let i = this.flowerSeedPodCrownRotationOffset; i < TWO_PI + this.flowerSeedPodCrownRotationOffset; i += this.flowerSeedPodCrownResolution) {
      const x = cos(i) * this.flowerSeedPodCrownSize;
      const y = this.flowerSeedPodCrownPosition + sin(i) * 4;
      line(0, this.flowerSeedPodCrownPosition, x, y);
    }

    strokeWeight(2);
    stroke(0, 0, 255);
    for (let i = this.flowerSeedPodCrownRotationOffset; i < TWO_PI + this.flowerSeedPodCrownRotationOffset; i += this.flowerSeedPodCrownResolution) {
      const x = cos(i) * this.flowerSeedPodCrownSize;
      const y = this.flowerSeedPodCrownPosition + sin(i) * 4;
      line(0, this.flowerSeedPodCrownPosition, x, y);
    }

    pop();
  }
}



class Segment {
  constructor(point, len, angle) {
    if (point.hasOwnProperty('angle')) {
      this.par = point;
      this.a = this.par.b.copy();
    } else {
      this.par = false;
      this.a = point;
    }
    this.len = len;
    this.angle = angle;
    this.selfAngle = angle;
    this.calculateB();
    this.first = false;
    this.last = false;

    this.xoff = random(1000);
  }

  wiggle() {
    let maxangle = 0.7;
    let minangle = -0.7;
    this.selfAngle = map(noise(this.xoff), 0, 1, maxangle, minangle);
    if (this.len < 0) {
      this.par.angle = this.par.angle + round(random(-2, 2));
      this.angle = round(random(-2, 2));
    }
  }

  update() {
    this.angle = this.selfAngle;
    if (this.par) {
      this.a = this.par.b.copy();
      this.angle += this.par.angle;
    } else {
      this.angle += -PI / 2;
    }
    this.calculateB();
  }

  calculateB() {
    this.b = createVector(
      this.a.x + this.len * cos(this.angle),
      this.a.y + this.len * sin(this.angle)
    );
  }
}




class Stalk {
  constructor({
    pos,
    segmentLength,
    segmentCount
  }) {
    this.pos = pos;
    this.segmentLength = segmentLength;
    this.segmentCount = segmentCount;

    this.flowerHead;
    this.flowerPos;
    this.lastSegmentAngle;

    this.shadow = true;
  }

  draw() {
    let stalk = new Segment(this.pos, this.segmentLength, 0);
    stalk.first = true;

    let current = stalk;
    for (let i = 0; i < this.segmentCount; i++) {
      this.segmentLength -= 10;
      const next = new Segment(current, this.segmentLength, 0);
      current.child = next;
      current = next;
      current.first = false;
      if (i === this.segmentCount - 1) {
        next.last = true;
      }
    }
    
    noFill();
    let next = stalk;
    beginShape();
    while (next) {
      next.wiggle();
      next.update();
      stroke(0, 0, 255);
      strokeWeight(2);
      vertex(next.a.x, next.a.y);
      if (next.last) {
        vertex(next.b.x, next.b.y);
        this.flowerPos = next.b.copy();
        this.lastSegmentAngle = next.angle;
      }
      next = next.child;
    }
    endShape();

    if (this.shadow) {
      stroke(0, 0, 255);
      for (let i = 0; i < 85; i++) {
        point(randomGaussian(this.pos.x, 40), randomGaussian(this.pos.y, 10));
      }
    }
  }
}


class Flower {
  constructor({
    pos,
    segmentLength = 60,
    segmentCount = 5,
    flowerHeadScale = 1,
    flowerHeadSmallLeafCount = 4,
    flowerHeadBigLeafCount = 4
  }) {
    this.stalk = new Stalk({
      pos,
      segmentLength,
      segmentCount
    });
    this.flowerHead;
    this.youngFlowerHead;
    this.flowerSeedPod;
    this.flowerHeadScale = flowerHeadScale;
    this.flowerHeadSmallLeafCount = flowerHeadSmallLeafCount;
    this.flowerHeadBigLeafCount = flowerHeadBigLeafCount;
  }

  draw() {
    this.stalk.draw();
    
    if (this.stalk.segmentLength < -5) {
      this.youngFlowerHead = new YoungFlowerhead({
        pos: this.stalk.flowerPos,
        angle: this.stalk.lastSegmentAngle
      });
      this.youngFlowerHead.draw();
    } else if (this.stalk.segmentLength > 14) {
      this.flowerSeedPod = new FlowerSeedPod({
        pos: this.stalk.flowerPos,
        angle: this.stalk.lastSegmentAngle
      });
      this.flowerSeedPod.draw();
    } else {
      this.FlowerHead = new FlowerHead({
        pos: this.stalk.flowerPos,
        flowerHeadScale: this.flowerHeadScale,
        flowerHeadSmallLeafCount: this.flowerHeadSmallLeafCount,
        flowerHeadBigLeafCount: this.flowerHeadBigLeafCount
      });
      this.FlowerHead.draw();
    }
  }
}






let flower;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, SVG);
  background(255);
  
  strokeJoin(BEVEL);
  noStroke();
  const blockSize = 30;
  
  for (let y = 0; y <= height; y += blockSize) {
    for (let x = 0; x <= width; x += blockSize) {
      const n = noise(x * 0.01, y * 0.01);
      const gray = map(n, 0, 1, 100, 255);
      fill(gray);
      noStroke();
      // rect(x, y, blockSize, blockSize);

      if (gray > 212) {
        const size = random(40, 70);
        strokeWeight(2);
        let pos = createVector(x + random(-10, 10), y + random(-10, 10));
        flower = new Flower({
          pos,
          segmentLength: size,
          flowerHeadScale: map(size, 40, 70, 0.6, 1),
          flowerHeadSmallLeafCount: random(3,4),
          flowerHeadBigLeafCount: random(3,4)
        });
        flower.draw();
      }
    }
  }
}

function draw() {
  
}
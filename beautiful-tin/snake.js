class Snake {
  
  constructor() {
    // this.testmessage = ["a","b","c","d","e","f","g"];
    // this.missageEliot = [1,0,1,1,0,0,1,1,1,1,1];
    // this.OGmessage = [1,1,1,1,1,0,0,1,1,0,1];
    this.message = [1,1,1,1,1,0,0,1,1,0,1];
    this.body = [];
    this.body[0] = createVector(floor(w/2),floor(h/2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 1;
  }
  
  setDir(x,y) {
    this.xdir = x;
    this.ydir = y;
  }
  
  update() {
    let head = this.body[this.body.length-1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
    
    
    // this.body[0].x += this.xdir;
    // this.body[0].y += this.ydir;
    
  }
  
  grow(){
    let head = this.body[this.body.length-1].copy();
    this.len++;
    this.body.push(head);
  }
  
  eat(pos){
    let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if (x == pos.x && y == pos.y) {
      this.grow();
      return true;
    } else {
      return false;
    }
  }
  
  endGame(){
    let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
        
    if (x > w-1 || x < 0 || y > h-1 || y < 2){
      return true;
    }
    
    for (let i = 0; i < this.body.length-1; i++) {
      let part = this.body[i];
      if (part.x == x && part.y == y) {
        return true;
      }
    }
    return false;
  }
  
  winGame(){
    if(finalCode == "11111001101"){
      return true;
    }
    return false
  }
  
  show() {
    for (let i = 0; i < this.body.length; i++) {
      textSize(1);
      textAlign(LEFT,TOP);
      textFont("Arial");
      fill(0);
      rect(this.body[i].x, this.body[i].y, 1,1);
      text("🔑",this.body[i].x,this.body[i].y)
    }
  }
  
}
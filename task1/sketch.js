let buttons = []
let canvas
let hasWon = false

function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent("game")

  for(i=0;i<6;i++){
    if(i<3){
      buttons[i] = new Button(i*125 + 75,125, i)
    }
    else{
      buttons[i] = new Button(width-(i*125 - 300), 300, i)
    }
  }
}

function draw() {
  //background(220, 255);

  for(i=0;i<6;i++){
    buttons[i].display()
  }

  if(didYouWin(buttons)){
    confirm("You won! \n Your next clue is [CLUE]. \n You can find your next task at [URL].")

    hasWon = true

    let clueTitle = createElement('h3', 'You won!')
    clueTitle.parent("clue")

    let clueText = createP("Your clue is [CLUE]. \n You can find your next task at [URL].")
    clueText.parent("clue")

    buttons.forEach(button =>{
      button.status = false
    })
  }

}

function mousePressed(){
  topLeftButton(buttons)
  topMidButton(buttons)
  topRightButton(buttons)

  btmRightButton(buttons)
  btmMidButton(buttons)
  btmLeftButton(buttons)
}

//button functions
function topLeftButton(list){
  if(list[0].mouseOnButton() && list[0].status == false){
    console.log("clicked")
    list[0].status = true
    list[1].status = true
    list[3].status = true
    //list[2].status = false
  }
  else if(list[0].mouseOnButton() && list[0].status == true){
    list[0].status = false
    list[1].status = false
    list[3].status = false
    //list[2].status = true
  }
}

function topMidButton(list){
   if(list[1].mouseOnButton() && list[1].status == true){
    console.log("clicked")
    list[1].status = false
    list[3].status = true
    list[0].status = false
  }
  else if(list[1].mouseOnButton() && list[1].status == false){
    list[1].status = true
    list[3].status = false
    list[0].status = true
  }
}

function topRightButton(list){
  if(list[2].mouseOnButton() && list[2].status == false){
    console.log("clicked")
    list[2].status = true
    list[0].status = false
  }
  else if(list[2].mouseOnButton() && list[2].status == true){
    list[2].status = false
    list[0].status = true
  }
}

function btmRightButton(list){
  if(list[3].mouseOnButton() && list[4].status == false){
    list[4].status = true
  }
  else if(list[3].mouseOnButton() && list[4].status == true){
    list[4].status = false
  }
}

function btmMidButton(list){
  if(list[4].mouseOnButton() && list[4].status == false){
    list[4].status = true
    list[2].status = false
  }
  else if(list[4].mouseOnButton() && list[4].status == true){
    list[4].status = false
    list[2].status = true
  }
}

function btmLeftButton(list){
  if(list[5].mouseOnButton() && list[5].status == false){
    list[5].status = true
    list[1].status = false
    list[2].status = true
  }
  else if(list[5].mouseOnButton() && list[5].status == true){
    list[5].status = false
    list[1].status = true
    list[2].status = false
    list[3].status = false
  }
}

function didYouWin(list){
  if(list[0].status == true && list[1].status == true && list[2].status == true && list[3].status == true && list[4].status == true && list[5].status == true){

  return true

  }
}
//class
class Button{
  constructor(x, y, id){
    this.x = x
    this.y = y
    this.id = id
    this.status = false
    this.color = color(0,0,0)
    this.sw = 10
    this.text = random(["👽","🛸"])
    this.lineColor = color(100,100,100)
  }

  display(){
    if(this.status == true){
      this.color = color(255,255,0)
      this.lineColor = color(255,255,50)
    }
    else{
      this.color = color(0,0,0)
      this.lineColor=color(100,100,100)
    }

      fill(this.color)
      strokeWeight(this.sw)
      stroke(this.lineColor)
      ellipse(this.x,this.y,100)
      textSize(60)
      text(this.text,this.x-28,this.y+20)



  }

  mouseOnButton(){
    if(collidePointCircle(mouseX,mouseY,this.x,this.y,100)){
      return true
    }
  else{
    return false
  }
}

}

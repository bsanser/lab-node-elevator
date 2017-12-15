class Elevator {
  constructor(){
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.requests   = [];
    this.direction = "UP";
    this.passengers = [];
    this.waitingList = [];
  }

  start() { 
    var upd = setInterval(update,1000);
  }
  stop() { 
    clearInterval(upd);
  }
  update() {
    for( let request of requests ){
      
    }
    log();
   }
  _passengersEnter() { }
  _passengersLeave() { }
  floorUp() { 
    if(this.floor < this.MAXFLOOR){
      this.floor++;
    }
  }
  floorDown() { 
    if(this.floor > 0){
      this.floor--;
    }
  }
  call(person) { 
    this.waitingList.push(person);
    this.requests.push(person.originFloor);
  }
  log() { 
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`);
  }
}

module.exports = Elevator;
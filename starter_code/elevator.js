const Person = require('./person.js');
class Elevator {
  constructor(){
    this.floor= 0;
    this.MAXFLOOR= 10;
    this.requests= [];
    this.direction = "";
    this.passengers =[];
    this.waitingList = [];
  }

  start() { 
    var upd = setInterval(this.update,3000);
    var generatePersons = setInterval(this.generatePersons,1000)
  }
 
  stop() { 
    clearInterval(upd);
    clearInterval(generatePersons);
  }
  update() {

    while(this.waitingList.length > 0) {
      for (let person in this.waitingList) {
        if(this.floor === person.originFloor) {
          this._passengersEnter(person);
        }
      }
    }

    while(this.requests.length > 0) {
      for (let request in this.requests) {
          if(this.floor < request) {
            this.direction = "UP";
            while(this.floor <= request){
              this.floorUp();
            }
            
          }
          else {
            this.direction = "DOWN";
            while(this.floor >= request){
              this.floorDown();
            }
          }
      }

    while (this.passengers.length >0) {
      for (let person in this.passengers) {
        if(this.floor === person.destinationFloor) {
          this._passengersLeave(person);
        }
      }
    }
 
    this.log();
    }
  }
  
  _passengersEnter(person) {
    this.passengers.push(person);
    this.waitingList.splice(this.waitingList.indexOf(person), 1);
    console.log(`A new passenger entered in floor ${person.originFloor} with destination ${person.destinationFloor}`);

   }
  _passengersLeave(person) { 
    this.passengers.splice(this.passengers.indexOf(person), 1);
    console.log(`A passenger whose destination floor was ${person.destinationFloor} left in floor ${this.floor}`);
  }
  
  floorUp() { 
    if(this.floor < this.MAXFLOOR){
      this.floor++;
      return this.floor;
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
  generatePersons() {
    var names = ['Andrea','Barbara','Carlos','Diana','Eduardo','Francisco', 'Gloria', 'Hilario', 'Irene', 'Julia','Kevin', 'Laura'];
    let origin = Math.floor(Math.random()*11);
    let destination = Math.floor(Math.random()*11);
    if (origin == destination){
        destination = Math.floor(Math.random()*11);
    }
    let name = names[Math.floor(Math.random()*names.length)];
    var person = new Person(name,origin,destination);
    this.call(person);
  }
}




module.exports = Elevator;


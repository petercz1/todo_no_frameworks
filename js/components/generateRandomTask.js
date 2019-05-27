export default class GenerateRandomTask {
  constructor() {
    this.tasks = ['watch GOT', 'check FB', 'wash dishes', 'refine plans for Death Star', 'invent killer app', 'practice sarcasm', 'make fun of hipsters', 'drink more coffee', 'google "pimp my noodles"', 'complain more often', 'spike watercooler', 'write "idiot filter" for gmail', 'ignore todo list', 'beat personal best on snake'];

  }

  generate() {
    let item = this.tasks[Math.floor(Math.random() * this.tasks.length)];
    // remove item from random tasklist
    this.tasks = this.tasks.filter(task => {
      return task != item;
    })

    // act like a typewriter, because I was bored
    let counter = 0;
    let typewriter = setInterval(function () {
      document.getElementById("taskname").value += item[counter];
      counter++;
      if (counter > item.length - 1) {
        clearInterval(typewriter)
      }
    }, 50)
  }
}
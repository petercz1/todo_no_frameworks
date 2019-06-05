export default new class GenerateRandomTask {
  constructor() {
    // list of tasks for random task generator below -  speeds up testing
    this.randomTasks = ['watch GOT', 'check FB', 'wash dishes', 'refine plans for Death Star', 'invent killer app', 'practice sarcasm', 'make fun of hipsters', 'drink more coffee', 'google "pimp my noodles"', 'complain more often', 'spike watercooler', 'write "idiot filter" for gmail', 'ignore todo list', 'beat personal best on snake'];
  }

  generate() {

    // randomly choose a task
    let item = this.randomTasks[Math.floor(Math.random() * this.randomTasks.length)];

    // remove item from random tasklist
    this.randomTasks = this.randomTasks.filter(task => {
      return task != item;
    });

    // clear previous task from input box
    document.getElementById("taskname").value = '';

    // act like a typewriter, because I was bored
    let counter = 0;
    let typewriter = setInterval(function () {
      document.getElementById("taskname").value += item[counter];
      counter++;
      if (counter > item.length - 1) {
        clearInterval(typewriter)
      }
    }, 50);
  }
}
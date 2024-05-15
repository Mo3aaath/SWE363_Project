class Room {
  constructor(id, name, capacity = 4) {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
    this.users = [];
    this.responsesObjects = [];
  }

  addUser(user, res) {
    this.responsesObjects.push(res);
    this.users.push(user);

    if (this.isFull()) {
      this.startTime = new Date();
      this.responsesObjects.forEach((res) => {
        try {
          res.json({
            message: "Game has started",
            questions: generateQuestions(),
          });
        } catch (e) {
          console.log(e.message);
        }
      });
      this.responsesObjects = [];
    }
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  getUsers() {
    return this.users;
  }

  isFull() {
    return this.users.length >= this.capacity;
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      capacity: this.capacity,
      users: this.users,
    };
  }

  static create({ id, name, capacity }) {
    return new Room(id, name, capacity);
  }
}

module.exports = Room;

function generateQuestions() {
  const questions = [];
  for (let i = 0; i < 10; i++) {
    questions.push({
      question: `Question ${i + 1}`,
      answers: ["A", "B", "C", "D"],
      correctAnswer: Math.floor(Math.random() * 4),
    });
  }
  return questions;
}

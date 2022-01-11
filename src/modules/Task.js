export default class TASK {
  constructor(desc, index, completed = 0) {
    this.completed = completed;
    this.desc = desc;
    this.index = index;
  }
}

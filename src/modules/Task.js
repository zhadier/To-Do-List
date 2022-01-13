export default class TASK {
  constructor(desc, index, completed = false) {
    this.completed = completed;
    this.desc = desc;
    this.index = index;
  }
}

const populateStorage = (list) => {
  localStorage.setItem(
    'taskCollection',
    JSON.stringify({
      tasks: list.taskList,
    }),
  );
};
export { populateStorage as default };

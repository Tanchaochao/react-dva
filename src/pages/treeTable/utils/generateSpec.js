export default (path, command) => {
  let spec = command;
  const first = path.shift();
  for (let i = path.length - 1; i >= 0; i--) {
    spec = {
      children: {
        [path[i]]: spec,
      },
    };
  }
  if (first != null) {
    spec = {
      [first]: spec,
    };
  }
  return spec;
};

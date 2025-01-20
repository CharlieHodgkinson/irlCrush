export const getJoinId = () => {
  const id = Math.random()
    .toString(36)
    .substring(2, length + 2);

  const formattedId = id.substring(0, 3) + " " + id.substring(3);
  return formattedId.toUpperCase();

  //TODO: check if id is unique
};

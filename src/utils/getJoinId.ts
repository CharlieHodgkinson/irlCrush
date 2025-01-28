export const getJoinId = () => {
  const id = Math.random().toString(36).substring(2, 8);
  return id.toUpperCase();

  //TODO: check if id is unique
};

export const formatId = (id: string) =>
  id.substring(0, 3) + " " + id.substring(3);

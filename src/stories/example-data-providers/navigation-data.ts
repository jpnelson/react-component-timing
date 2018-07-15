function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getNavigationData = async () => {
  await timeout(1234);
  return ["Page 1", "Page 2", "Page 3"];
};

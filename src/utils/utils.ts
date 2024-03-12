export const routeText = (str: string): string => {
  return str.toLowerCase().split(" ").join("-");
};

export const routeFull = (parent: string, children: string): string => {
  return `/${routeText(parent)}/${routeText(children)}`;
};

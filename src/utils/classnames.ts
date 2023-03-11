interface ConditionalClassNames {
  [key: string]: boolean;
}
const classnames = (...classNames: Array<string | ConditionalClassNames>) => {
  let classes = [];
  for (let i = 0; i < classNames.length; i++) {
    const classArg = classNames[i];
    if (typeof classArg === "string") {
      classes.push(classArg);
    } else if (Object.values(classArg).length) {
      const classArgEntries = Object.entries(classArg)
        .filter((className) => className[1])
        .flatMap((value) => value[0])
        .join(" ");
      classes.push(classArgEntries);
    }
  }
  return classes.join(" ");
};

export default classnames;

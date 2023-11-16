function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);

  propNames.forEach((name) => {
    if (typeof object[name] === 'object' && object[name] !== null) {
      deepFreeze(object[name]);
    }
  });

  return Object.freeze(object);
}

export default deepFreeze;

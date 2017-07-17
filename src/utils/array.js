function arrayToTree(array, id = 'id', pid = 'pid', children = 'children') {
  if (Array.isArray(array)) {
    const result = [];
    const map = array.reduce((p, i) => {
      const prev = p;
      prev[i[id]] = i;
      return prev;
    }, {});

    array.forEach((item) => {
      const p = map[item[pid]];
      if (p) {
        p[children] = p[children] || [];
        p[children].push(item);
      } else {
        result.push(item);
      }
    });

    return result;
  }
  return [];
}

export { arrayToTree };

const names = ['Matt Maribojoc', 'Lebron James', 'Bill Gates', 'Childish Gambino']

/**
 * Generate random posts based on providing number
 * @param {Number} number 
 * @returns {Array}
 */
const getPosts = (number) => {
  let ret = []

  for (let i = 0; i < number; i++) {
    ret.push({
      author: names[i % names.length],
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    })
  }

  return ret
}

/**
 * Mock getPosts api
 * @returns {Promise}
 */
const getApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getPosts(100));
    }, 2000);
  });
};

export {
  getApi
}

{
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        if (Math.random() > 0.2) {
          console.log(`cas favorable`);
          resolve("qsdfqsrazerzAZERazeraz");
        } else {
          console.log(`cas défavorable`);
          reject("Erreur dans getToken");
        }
      }, 1000)
    })
  }
  function getUser(token) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        if (Math.random() > 0.1) {
          console.log(`cas favorable`);
          user = {
            name: "toto"
          }
          resolve(user);
        } else {
          console.log(`cas défavorable`);
          reject("Erreur dans getUser");
        }
      }, 1000)
    })
  
  }
  /* getToken()
    .then(token => {
      console.log(`token`, token);
      return getUser(token);
    })
    .then(user => {
      console.log(`user`, user);
    })
    .catch(error => {
      console.error(`Erreur attrapée`, error)
    }); */
  
  (async function () {
    try {
      const token = await getToken();
      console.log(`token`, token);
      const user = await getUser(token);
      console.log(`user`, user);
    } catch (error) {
      console.log(`Erreur attrapée`, error);
    }
  })();
  
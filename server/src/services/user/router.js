const { firebase, admin } = require('../../config/firebase');

exports.login = (req, res) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(function () {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(function (idToken) {
          res.send(idToken);
          res.end();
        })
        .catch(function (error) {
          //Handle error
        });
    })
    .catch(function (error) {
      //Handle error
    });
};

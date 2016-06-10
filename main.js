angular.module('app', ['angular.filter'])
  .config(() => {
  // Initialize Firebase
    var config = {
    apiKey: "AIzaSyDwW2yfWv13XviFVaanBvM6wI1cix6J1Ts",
    authDomain: "movie-history-e5c21.firebaseapp.com",
    databaseURL: "https://movie-history-e5c21.firebaseio.com",
    storageBucket: "movie-history-e5c21.appspot.com",
    };
  firebase.initializeApp(config);
  })
  .controller('MainCtrl', function($timeout) {
    const main = this;

    main.options = {};

    main.submitNew = {
      votes: 0
    }

    main.header = 'Vote for anything, just add your nomination below.';

    main.nominateCount = function(choice) {
      firebase.database().ref(`/votes/${choice.$key}/votes`).set(choice.votes + 1);
    }

    main.nominate = function(newMovie) {
      $timeout(() => {
        firebase.database().ref('/votes').push(newMovie);
      })
    }

  // Firebase listeners for child data updates
    firebase.database().ref('/votes').on('child_added', function(childData) {
      $timeout(() => {
        main.options[childData.key] = childData.val();
      });
    })

    firebase.database().ref('/votes').on('child_changed', function(childData) {
      $timeout(() => {
        main.options[childData.key] = childData.val();
      });
    })

  })

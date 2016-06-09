angular.module('app', [])
  .config(() => {
    firebase.initializeApp({
       apiKey: "AIzaSyDwW2yfWv13XviFVaanBvM6wI1cix6J1Ts",
    authDomain: "movie-history-e5c21.firebaseapp.com",
    databaseURL: "https://movie-history-e5c21.firebaseio.com",
    storageBucket: "movie-history-e5c21.appspot.com",
    })
  })
  .controller('MainCtrl', function ($scope) {
    const main = this;

    main.heading = 'Vote Now!!!';

    main.HarleyDavidson = function () {
      firebase.database().ref('/votes/HarleyDavidson')
        .set(main.HarleyDavidsonCount + 1)
    }
    main.Honda = function () {
      firebase.database().ref('/votes/Honda')
        .set(main.HondaCount + 1)
    }

    firebase.database().ref('/votes').on('value', (change) => {
      const data = change.val();; // {HarleyDavidson: 1, Honda: 2}
      console.log("data: ", data);
      main.HarleyDavidsonCount = data.HarleyDavidson
      main.HondaCount = data.Honda
      // $scope.$apply()
    })
  })  

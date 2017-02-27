angular.module('starter.controllers', [])

//********************************************************************

.controller('DashCtrl', function($scope) {})

//********************************************************************

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

//*******************************************************************

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
 
})
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

.controller('Profil1Ctrl', function($scope) {
  
 
})

//***********************************************************************

.controller('ProfilCtrl', function($scope,$http,$stateParams) {

 $stateParams.profilId;
 var idUser = $stateParams.profilId;
 console.log(idUser, 'yo2');


 $http.get('http://carbillet.net/api-digitalGrenoble/users/')
   .then(function(response){
    $scope.ProfilsId = response.data.users;
    console.log($scope.ProfilsId,'borissio');

     for (var i = 0; i <  $scope.ProfilsId.length ; i++){
   
      if (idUser == $scope.ProfilsId[i].idUser){

        $scope.infoUser = $scope.ProfilsId[i];
        
        console.log($scope.ProfilsId[i],'carpaccio');
      }
     };
    });
     console.log($scope.ProfilsId);
     
      $scope.infoUser = {};
      $scope.modifUser = function(){
         console.log($scope.infoUser);
         $scope.data = {

      json : {
       idUser : $scope.infoUser.idUser,
       adress : $scope.infoUser.adress,
       age : $scope.infoUser.age,
        phone : $scope.infoUser.phone
      }

    };
          console.log($scope.data);
         $http.put('http://carbillet.net/api-digitalGrenoble/users/',$scope.data)
         .then(function(response){
          console.log(response);
         })

        console.log( 'getho');
       
   }

 

})


//***************************************************************************

.controller('loginCtrl', function($scope,$http,$location) {
  
 $scope.data = {},
  
  $scope.sendLog = function (){   
  
   
   $scope.data = {

      json : {
        username : $scope.data.username,
        password : $scope.data.password 
      }
    };
   
   
   $http.post("http://carbillet.net/api-digitalGrenoble/credentials/",$scope.data)
            .then(function (response) {
            var userok = response.data.statePwdApi;
            var userId = response.data.idUserApi;
            
            if (userId < 0 | userId === null | userok !== "ok" | userId == "undefined"){
               
               var Id = localStorage.getItem("id");
              
               $location.path("login");
               
               console.log(userId ,"yo");
              // console.log(Id);
                
                if (Id > 0){

                    $location.path("tab/dash")
                }
               

            }
                 else if(userId > 0) {
                
                    console.log(userId);
                    localStorage.setItem("id",userId);
                    // var sessionID = localStorage.getItem("id");
                      $location.path("tab/dash")

              }

                else {
                 
                 localStorage.setItem("id",userId);

                }
        
           
        });
   

  };
 


})




//******************************************************************************

.controller('GeolocCtrl', function($cordovaGeolocation,$scope,$http,$location,$state) {
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      
      $scope.lat  = position.coords.latitude
      $scope.long = position.coords.longitude
      
      $scope.map = {
        center: [$scope.lat,$scope.long],
      
                   };
     
      $scope.marker = {
          position: [$scope.lat,$scope.long],
          decimals: 4, 
                      }



                             }, 

function(err) {
      // error
               });
  
   $http.get('http://carbillet.net/api-digitalGrenoble/users/')
   .then(function(response){
   $scope.Profils = response.data.users;
    
       // var tab = [];
       $scope.friendloc = function($geol){

         for (var i = 0; i< $scope.Profils.length ; i ++){
         
            if ($geol == $scope.Profils[i].idUser){
           
            tab1 = [$scope.Profils[i].position];

           // tab.push(tab1);

            $scope.points1 = { coords:[tab1]},

            $scope.map = {
                             center:[$scope.Profils[i].position],
      
                   };

            
           
              // console.log( $scope.points1);
          
           }
  
         } 
        
       }

       $scope.modif = function($geol){

         for (var i = 0; i< $scope.Profils.length ; i ++){
         
            if ($geol == $scope.Profils[i].idUser){

              $scope.userInfo = $scope.Profils[i];

              $state.go('tab.profil' , {profilId : $scope.Profils[i].idUser });

              console.log($scope.userInfo);



            }
          };



        $location.path("tab/profil");


       };

    });

  })

//********************************************************************

.controller('AccountCtrl', function($scope,$location) {
  $scope.settings = {
    enableFriends: true
  };

   $scope.deconnect = function(){

   localStorage.removeItem("id");
   $location.path("login");
 }


});




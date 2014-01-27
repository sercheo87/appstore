'use strict';

angular.module('appstoreApp')
.factory('productService', function () {
	// Public API here
	var STORAGE_ID = "productService";
	var STORAGE_ID_ROW = "productServiceId";
	var productsCollection="[]";

	return {
		get: function () {
			productsCollection = (JSON.parse(localStorage.getItem(STORAGE_ID) || "[]"));
			return (productsCollection);
		},

		put: function (product) {
			var idMax=0;

			productsCollection = (JSON.parse(localStorage.getItem(STORAGE_ID) || "[]"));
			idMax=localStorage.getItem(STORAGE_ID_ROW);
			if(isNaN(idMax)|| idMax === undefined || idMax === null )
			{
				idMax=0;
			}

			idMax=parseInt(idMax)+1;
			console.log('New Id:'+idMax);
			
			localStorage.setItem(STORAGE_ID_ROW, idMax);
			product.id=idMax;
			productsCollection.push(product);
			localStorage.setItem(STORAGE_ID, JSON.stringify(productsCollection));
			productsCollection = (JSON.parse(localStorage.getItem(STORAGE_ID) || "[]"));
		},

		clear: function(){
			localStorage.setItem(STORAGE_ID, JSON.stringify("[]"));
			productsCollection = (JSON.parse(localStorage.getItem(STORAGE_ID) || "[]"));
		},

		remove: function (product){
			var index=productsCollection.indexOf(product);
			if(index>=0)
			{
				productsCollection.splice(index, 1);
				localStorage.setItem(STORAGE_ID, JSON.stringify(productsCollection));
				productsCollection = (JSON.parse(localStorage.getItem(STORAGE_ID) || "[]"));
				console.log('Elemeto Borrado');
			}
			else
			{
				console.log('No se ha borrado');
			}
		},

		getIdRow: function(){
			var idMax=0;

			idMax=localStorage.getItem(STORAGE_ID_ROW);
			if(isNaN(idMax)|| idMax === undefined || idMax === null )
				idMax=0;
			idMax=parseInt(idMax)+1;
			localStorage.setItem(STORAGE_ID_ROW, idMax);
			
			console.log('New Id:'+idMax);
			return idMax;
		}
	};
});


angular.module('appstoreApp').service('Note', function(){
	return {
		query:function() { 
			var notes = [];
			for(var key in localStorage) {
				if(key.indexOf("note_") == 0) {
					notes.push(JSON.parse(localStorage[key]));
				}
			}
			console.dir(notes);
			return notes; 
		},
		delete:function(i) {
			localStorage.removeItem("note_"+i);
		},
		get:function(i) { 
			if(localStorage["note_"+i]) return JSON.parse(localStorage["note_"+i]);
			console.log("no note for "+i);
		},
		store:function(note) {
			if(!note.hasOwnProperty('id')) {
				//yep, hack, get all notes and find highest id
				var notes = this.query();
				var highest = 0;
				for(var i=0; i<notes.length; i++) {
					if(notes[i].id > highest) highest=notes[i].id;
				}
				note.id = ++highest;
			}
			note.updated = new Date();
			localStorage["note_"+note.id] = JSON.stringify(note);
		}
	}
});

//    //remote storage version
//    .factory("todoStorage", ["$http", "$waitDialog", function ($http, $waitDialog) {
//        var readUrl = "https://secure.openkeyval.org/";
//        var writeUrl = "https://secure.openkeyval.org/store/?";
//
//        var key = "JQueryMobileAngularTodoapp";
//
//        function get(callback) {
//            $waitDialog.show();
//            return $http({
//                method: "JSONP",
//                url: readUrl + key + "?callback=JSON_CALLBACK"
//            }).then(function (response) {
//                    $waitDialog.hide();
//                    callback(response.data);
//                });
//        }
//
//        function put(value) {
//            $waitDialog.show();
//            value = encodeURIComponent(JSON.stringify(value));
//            $http({
//                method: "JSONP",
//                url: writeUrl + key + "=" + value + "&callback=JSON_CALLBACK"
//            }).then(function () {
//                    $waitDialog.hide();
//                });
//        }
//
//        return {
//            get: get,
//            put: put
//        };
//    }]);
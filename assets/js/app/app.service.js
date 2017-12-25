//This is the service that calls the backend with AJAX.
let Service = {};

//The method that gets the questions from the API.
Service.get = function(callback){
    let href = 'index.php/questions_api/get';
    $.ajax(href, {
        success: function(data) {
           callback(data);
        },
        error: function() {
           console.log('GET AJAX Request Failed.');
        },
        type: 'get',
        dataType: 'json'
     });
};

//The method that posts the questions to the API.
Service.post = function(_data, callback){
    let href = 'index.php/questions_api/post';
    $.ajax(href, {
        success: function(data){
            callback(data);
        },
        error: function(){
            callback(data);
            console.log('POST AJAX Request Failed.');
        },
        type: 'post',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        data: _data
    });
};
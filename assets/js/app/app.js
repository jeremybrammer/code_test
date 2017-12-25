//This is the main namespace that holds the application.
let app = {};

//This method initializes the application.
app.init = function(){   
    this.exam = false; //This variable holds the exam object later.
    this.update_questions(function(questions){}); //Update the questions from the API.
    this.take_exam_element = 'a#takeExamLink'; //This is the link to start exam. It is only visible when there are questions.
    this.switchScreen('main_menu'); //Switch to the main menu screen.

    //Dependency injection for the Add Questions screen.
    let aq_dependencies = {
        switchScreen: app.switchScreen,
        take_exam_element: app.take_exam_element,
        update_questions: app.update_questions,
        growl: app.growl,
        service: Service
    }
    var add_quesions = new Add_Question(aq_dependencies);

    //Dependency injection for the Take Exam screen.
    let te_dependencies = {
        switchScreen: app.switchScreen,
        take_exam_element: app.take_exam_element,
        growl: app.growl
    }
    var take_exam = new Take_Exam(te_dependencies);

};

//This method updates the questions from the service/API.
app.update_questions = function(callback){
    Service.get(function(data){
        //If there are more than zero questions.
        if(data.questions.length > 0){
            //Make a fresh exam.
            app.exam = new Exam(data.questions);
            $(app.take_exam_element).show(); //Show the take exam button.
        }
        else{
            //Else there aren't any questions.
            app.exam = false;
        }
        callback(data.questions);
    });
};

//This method shows the user feedback with a pop up div at top of screen.
app.growl = function(message, delay){
    let element = $('#messageWrapper').find('#message');
    element        
        .html(message)
        .show().delay(delay)
        .fadeOut('slow', function(){
            $(this).html('');
    });
};

//This method switches screens in the user-interface.
app.switchScreen = function(screen){
    var main_menu = $('#main_menu');
    var add_question = $('#add_question');
    var take_exam = $('#take_exam');
    $('#main_menu, #add_question, #take_exam').hide();
    switch(screen){
        case 'main_menu': main_menu.fadeIn(); break;
        case 'add_question': add_question.fadeIn(); break;
        case 'take_exam': take_exam.fadeIn(); break;
        default: main_menu.fadeIn(); break;
    }
};
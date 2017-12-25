//This represents the "Take Exam" screen.
let Take_Exam = function(_dependencies){
    //Get dependencies.
    var _switchScreen = _dependencies.switchScreen;
    var _take_exam_element = _dependencies.take_exam_element;
    var _growl = _dependencies.growl;

    //Initialize some helpful variables.
    var count_down_element = '#count-down';
    var test_question_element = '#current_test_question';
    var cancel_exam_element = '#cancel_exam';
    var finish_exam_element = '#finish_exam';
    var exam_final_panel = '#exam_final_panel';
    var check_answer_element = '#check_answer';
    var exam_answer_element = '#exam_answer';
    var final_summary = '#final_summary';
    var question_template_number = '.question_template_number';
    var question_template_question = '.question_template_question';
    var currentQuestion = false;
    
    //This method sets the selectors into the events.
    function set_take_exam(){
        take_exam_link_click(_take_exam_element);
        cancel_exam_click(cancel_exam_element);
        check_answer_click(check_answer_element);
        finish_exam_click(finish_exam_element);
    };

    //This method is the cancel exam button click event.
    function cancel_exam_click(selector){
        $(selector).click(function(){
            _growl('End of exam (canceled).', 6000);
            reset_exam();
        });
    }

    //This method is the take exam link click event.
    function take_exam_link_click(selector){
        $(selector).click(function(){
            //Set some element properties.
            $(final_summary).html('');
            $(test_question_element).hide();
            $(exam_final_panel).hide();
            //Switch the screen.
            _switchScreen('take_exam');
            //Start the count-down
            $(count_down_element).fadeIn();
            countdown(count_down_element, 5, function(){
                $(count_down_element).hide().html('');
                display_question(); //Show the question to the user.
                $(test_question_element).fadeIn();
            });
        });
    }

    //This is the check answer button click event.
    function check_answer_click(selector){
        $(selector).click(function(){
            let attempted_answer = $(exam_answer_element).val(); //Get the user's answer.
            $(exam_answer_element).val(''); //Clear answer field.
            let checkedAnswer = currentQuestion.checkAnswer(attempted_answer);
            let status = app.exam.getStatus(); //Get the exam status.
    
            //Growl the result and score.
            let message = (checkedAnswer.result)?'Correct.':'Incorrect.';
            message += ' Correct answer for question #' + checkedAnswer.questionID+1 + ' was: ' + checkedAnswer.answer + '.';
            _growl(message, 4000);
            //Display the next question.
            display_question(status);
        });
    }

    //This is the click event for the "finish" button at the end of the exam.
    function finish_exam_click(selector){
        $(selector).click(function(){
            reset_exam(); //Reset the exam to the beginning.
        });
    }

    set_take_exam(); //Call this now because of the order functions are declared.

    //This is a count-down timer that shows the user the exam is starting.
    function countdown(selector, count, callback){
        let timer = setInterval(function() {
            if(count === 0){
                clearInterval(timer);
                callback();
            }
            else{
                $(selector).html(count);
                count--;
            }
        }, 1000);
    }

    //This resets the exam.
    function reset_exam(){
        app.exam.resetExam(); //Reset exam.
        _switchScreen('main_menu'); //Switch screens.
    }

    //This method displays the current question, and if complete, the final summary/score.
    function display_question(examStatus){
        let q = app.exam.getQuestion();
        if(q != false){
            currentQuestion = q;
            $(question_template_number).html(q.questionID+1);
            $(question_template_question).html(q.question);
        }
        else{
            //This is when the exam is complete and the user is reviewing the score.
            $(test_question_element).hide();
            $(question_template_number).html('');
            $(question_template_question).html('');
            //show the final score.
            $(exam_final_panel).show(); 
            let totalCorrect = examStatus.score.correct;
            let total = examStatus.score.total;
            let message = 'Your final score is:  ';
            message += totalCorrect + '/' + total;   
            $(final_summary).html(message);
        }
    }


};
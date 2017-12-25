//This represents the Add Question screen.
let Add_Question = function(_dependencies){
    //Get dependencies.
    var _switchScreen = _dependencies.switchScreen;
    var _take_exam_element = _dependencies.take_exam_element;
    var _update_questions = _dependencies.update_questions;
    var _growl = _dependencies.growl;
    var _service = _dependencies.service;
    //Set some useful variables.
    var form = 'form#add_question_form';
    var cancel_button = 'input#cancel_form';
    var form_fields = {};
    var add_question_element = 'a#addQuestionLink';
    form_fields.question = 'textarea#question';
    form_fields.question_order = 'input#question_order';
    form_fields.answer = 'textarea#answer';
    form_fields.all = 
        form_fields.question + ', ' + 
        form_fields.question_order + ', ' +
        form_fields.answer;
    
    //This sets the selectors into the events.
    function setEvents(){
        submit_add_question_form(form);
        add_question_link_click(add_question_element);
        cancel_form_click(cancel_button);
    }

    //This is the event for the Add Question link click.
    function add_question_link_click(selector){
        $(selector).click(function(){
            _switchScreen('add_question'); //Switch screens.
        });
    }

    //This is the event for the cancel Add Question button.
    function cancel_form_click(selector){
        $(selector).click(function(){
            clear_form();
            _switchScreen('main_menu'); //Switch screen.
        });
    }

    //This is the Add Question form submit event.
    function submit_add_question_form(selector){
        $(selector).submit(function(e){
            e.preventDefault();
            let input_data = $(this).serializeArray();
            clear_form();
            //Use the service to post the question to the API.
            _service.post(input_data, function(response){
                let message = '';
                //If the post was successful.
                if(response.status != 'failed'){
                    message = 'Question added.'
                    //Update the questions from the API and enable the take exam button.
                    _update_questions(function(questions){
                        $(_take_exam_element).show();
                    });
                }
                else{
                    //Else the post wasn't successful.
                    message = parseErrors(response);
                }
                //Show the user feedback, then switch screens.
                _growl(message, 6000);
                _switchScreen('main_menu');
            });
        });
    }

    setEvents(); //Call this now because of the order functions are declared.

    //This method clears the form fields.
    function clear_form(){
        $(form_fields.all).val('');
    }

    //This method parses errors returned form the PHP validator into a single string.
    function parseErrors(errorResponse){
        let message = 'Failed: ';
        let errors = [];
        if(errorResponse.error.question != undefined && errorResponse.error.question.length > 0){
            for(let i of errorResponse.error.question){
                errors.push(i);
            }
        }
        if(errorResponse.error.question_order != undefined && errorResponse.error.question_order.length > 0){
            for(let i of errorResponse.error.question_order){
                errors.push(i);
            }
        }
        if(errorResponse.error.answer != undefined && errorResponse.error.answer.length > 0){
            for(let i of errorResponse.error.answer){
                errors.push(i);
            }
        }
        for(let error of errors){
            message += error + '.  ';
        }
        return message;
    }

    
};
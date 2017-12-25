//This is the exam that takes questions for input.
let Exam = function(_questions){
    
    var questions = _questions; //The list of questions passed into the exam.
    var n = questions.length; //n is the number of questions.
    var i = 0; //i is an integer in the range of 0 to n-1.
    var _currentQuestion = setCurrentQuestion(i); //Initialize this to the first question.
    var _score = 0; //The user's score.  Start it at zero.

    //This sets the current question based on the id.
    function setCurrentQuestion(_i){
        _currentQuestion = questions[_i];
    }

    //This is the definition of when the array is out of bounds.
    function outOfBounds(){
        return i > n-1;
    }

    //This resets the to the beginning.
    function resetExam(){
        i = 0; 
        setCurrentQuestion(i);
        _score =0; 
    }

    //This is the response that is returned to the user when they get a question.
    //Each question contains its own checkAnswer method.
    function Question(_question, _questionID){
        return {
            questionID: i,
            question: _currentQuestion.question,
            checkAnswer: function(_answer){
                let output = {};
                let correct = false;
                if(questions[_questionID].answer == _answer){
                    _score++;
                    correct = true;
                }
                return {
                    questionID: _questionID,
                    result: correct,
                    answer: questions[_questionID].answer
                };
            }
        };
    }

    //This is a public version of the method that resets the form.
    this.resetExam = function(){
        resetExam();
    };

    //This is a public method so the user can get a question.
    this.getQuestion = function(){
        setCurrentQuestion(i);
        let response = false;
        if(!outOfBounds()){ 
            //Get the current Question and wrap it in a Response object.
            response = new Question(_currentQuestion, i);
            //Iterate to next question.
            i++; 
        }
        //return the response object.
        return response;
    };

    //This is a public method so the user can see the score and status of the exam.
    this.getStatus = function(){
        return {
            currentQuestion: i,
            totalQuestions: n, 
            score: {
                correct: _score,
                total: n,
                friendly: _score.toString()+'/'+n.toString()
            }
        }
    };
    
}
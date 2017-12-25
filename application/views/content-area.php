<!-- This is the pop up message "growl" element -->
<div id="messageWrapper">
    <div id="message"></div>
</div>

<!-- This is the main content area for the application -->
<div id="content_area">

    <!-- START Main Menu -->
    <div  id="main_menu" class="panel panel-default">
        <div class="panel-body">
            <h3><?php echo $title; ?></h3>
            <p class="explaination">
                This example project is written with CodeIgniter Version: 2.2.6, and PHP 5.6.27.  
                It uses a MySQL database, and uses an MVC pattern.  The backend provides a JSON API 
                that is consumed by a Javascript front-end.  
                The front-end uses Bootstrap for responsive style and jQuery to manage the user-interface.  
                Validation is accomplished by use of Composer packages.  This application only has one 
                page load, and then uses AJAX to communicate with the backend, with Javascript managing 
                the state of the app.  The system was developed in a Docker container, and upon 
                completion, the database was backed up in an SQL file <a href="<?php echo base_url(); ?>/MySQL_Database_Backup.sql">found here</a>, and the source code 
                was uploaded to Github.
            </p>
            <a class="app_link" id="addQuestionLink">Add a Question</a>
            <a class="app_link" id="takeExamLink">Take the Exam</a>
        </div>
    </div>
    <!-- END Main Menu -->

    <!-- START Add New Question Form -->
    <div id="add_question" class="panel panel-default">
        <div class="panel-body">
            <h3>Add Question</h3>
            <form id="add_question_form" name="add_question_form" >
                <div class="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label for="question">Question</label>
                    <textarea type="text" id="question" name="question" class="form-control"></textarea>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label for="answer">Answer</label>
                    <textarea type="text" id="answer" name="answer" class="form-control"></textarea>
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12 form-group">
                    <label for="question_order">Question Order</label>
                    <span class="formTip">(Alphabetical order will be used in the case of duplicate sequence numbers)</span>	
                    <input type="text" id="question_order" name="question_order" class="form-control" />
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                    <input type="submit" value="Add Question" class="btn btn-primary" />
                    <input id="cancel_form" type="button" value="Cancel" class="btn btn-default" />
                </div>
            </form>
        </div>
    </div>
    <!-- END Add New Question Form -->

    <!-- START Exam -->
    <div id="take_exam" class="panel panel-default">
        <div class="panel-body">
            <h3>Online Exam</h3>
            <!-- This div holds the current question -->
            <div id="current_test_question">
                <p>Question #<span class="question_template_number"></span></p>
                <p class="question_template_question"></p>
                <div class="form-group">
                    <label for="exam_answer" class="text-left">Your answer:</label>
                    <textarea id="exam_answer" name="exam_answer"></textarea>
                </div>
                <button id="check_answer" class="btn btn-primary">Check Answer</button>
                <button class="btn btn-default" id="cancel_exam">Quit this Exam</button>
            </div>
            <!-- This div shows the final result/summary of the exam -->
            <div id="exam_final_panel">
                <h3>Summary</h3>
                <p id="final_summary"></p>
                <button class="btn btn-default" id="finish_exam">Finish</button>
            </div>
            <!-- This div shows the count-down at the beginning of the test -->
            <div id="count-down"></div>
        </div>
    </div>
    <!-- END Exam -->

</div>
<!-- End main content area -->
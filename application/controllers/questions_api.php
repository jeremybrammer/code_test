<?php

//This is an API controller for the questions table in the database.
class questions_api extends CI_Controller {
   
    //API endpoint /questions_api/
    public function index()
    {
        //Let the user know this is the right controller.
        echo 'Questions API';
    }

    //Create a json type header and pretty-print the data as json.
    private function output_json($data)
    {
        header('Content-Type: application/json');
        echo json_encode($data, JSON_PRETTY_PRINT);
    }

    //API endpoint /questions_api/get
    //Gets all data from the questions table.
    public function get()
    {
        //Load the question model.
        $this->load->model('Question_Model');
        //Get the questions from the database model.
        $output['questions'] = $this->Question_Model->get_questions();
        //Add a 'success' output and display the data. (Codeignitor will catch and display other errors before this if it fails)
        $output['status'] = 'success';
        $this->output_json($output);
    }

    //API endpoint /questions_api/post
    //Posts new data to the questions table.
    public function post()
    {
        //Get data from the post array.
        $data = $this->input->post();

        //Validate the data with Valitron Composer package.
        $validator = new Valitron\Validator($data);
        $rules = [
            'required' => [
                ['question'],
                ['question_order'],
                ['answer']
            ],
            'lengthMax' => [
                ['question', 1000],
                ['question_order', 5],
                ['answer', 300]
            ],
            'integer' =>  ['question_order']
        ];
        $validator->rules($rules);
        
        //If valid data:
        if($validator->validate()){
            //Load the question model that talks to database.
            $this->load->model('Question_Model');
            
            //Define the model to insert into the database.
            $output = [
                'question' => $data['question'], 
                'question_order' => $data['question_order'], 
                'answer' => $data['answer']
            ];
            
            //Insert the data.
            $success = $this->Question_Model->insert_question($output);

            //If data is inserted successfully.
            if($success){
                //Create an output and display it.
                $output['status'] = 'success';
                $output['question_id'] = $success;
                $this->output_json($output);
            }
            else{
                //Else the insert failed for some reason.  Create an output and display it.
                $output['status'] = 'failed';
                $output['error'] = 'Mysql insert error.';
                $this->output_json($output);
            }        
        }
        else{
            //Else the data was not valid.  Create an output and display it.
            $output = ['status' => 'failed'];
            $output['error'] = $validator->errors(); //Valitron errors.
            $this->output_json($output);
        }
    }

}

?>
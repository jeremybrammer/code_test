<?php

//This is the model that interfaces with the database.
class Question_Model extends CI_Model {

    //Constructor.
    public function __construct()
    {
        parent::__construct();
    }

    //Get data from the 'questions' table.
    public function get_questions()
    {
        //Sort first by order number, then by question alphabetically.
        //Duplicate order numbers are allowed this way.
        $this->db->order_by('question_order ASC, question ASC');
        $query = $this->db->get('questions');
        return $query->result();
    }

    //Insert data into the 'questions' table.
    public function insert_question($data)
    {
        $output = null;
        /*
            From Codeigniter documentation for $this->db->insert(): 
            "All values are escaped automatically producing safer queries."
        */
        $query = $this->db->insert('questions', $data);
        //If the data was inserted:
        if($this->db->affected_rows() == 1){
            $output = $this->db->insert_id(); //Get the last insert id.
        } 
        else{
            //Else there was a problem. Just return false for now.
            $output = false;
        }
        return $output;
    }

}

?>
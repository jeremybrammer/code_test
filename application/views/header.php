<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title><?php echo $title; ?></title>

        <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>application/vendor/twbs/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/style.css">
        <script type='text/javascript' src="<?php echo base_url(); ?>assets/js/jquery-3.2.1.min.js"></script>
        
        <!-- Start scripts I wrote -->
        <script type='text/javascript' src="<?php echo base_url(); ?>assets/js/app/app.exam.js"></script>
        <script type='text/javascript' src="<?php echo base_url(); ?>assets/js/app/app.service.js"></script>
        <script type='text/javascript' src="<?php echo base_url(); ?>assets/js/app/app.js"></script>
        <script type='text/javascript' src="<?php echo base_url(); ?>assets/js/app/screens/app.add_question.js"></script>
        <script type='text/javascript' src="<?php echo base_url(); ?>assets/js/app/screens/app.take_exam.js"></script>
        <script>
            $(document).ready(function(){
                app.init(); //Application driver (This is the entry point into my Javascript front end).
            });
        </script>
        <!-- End scripts I wrote -->
        
    </head>
    <body>
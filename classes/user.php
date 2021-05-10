<?php
    class User{
            private $name;
            private $surname;
            private $type;
            private $profile_pic;
            private $username;
            private $password;
            private $email;
            private $bio;

            function __construct(){}

            public function displayName(){
                echo $this->name;
            }
            public function displaySurname(){
                echo $this->surname;
            }
            public function displayType(){
                echo $this->type;
            }
            public function displayProfilePic(){
                echo $this->profile_pic;
            }
            public function displayUsername(){
                echo $this->username;
            }
            public function displayEmail(){
                echo $this->email;
            }
            public function displayBio(){
                echo $this->bio;
            }
            public function displayPassword(){
                echo $this->password;
            }

            public function setName($value) {
                $this->name = $value;
            }
            public function setSurname($value){
                $this->surname = $value;
            }
            public function setType($value){
                $this->type = $value;
            }
            public function setProfilePic($value){
                $this->profile_pic = $value;
            }
            public function setUsername($value){
                $this->username = $value;
            }
            public function setEmail($value){
                $this->email = $value;
            }
            public function setBio($value){
                $this->bio = $value;
            }
            public function setPassword($value){
                $this->password = $value;
            }
    }

?>
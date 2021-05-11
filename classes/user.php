<?php
    class User{
            private $hash;
            private $name;
            private $surname;
            private $type;
            private $profile_pic;
            private $username;
            private $password;
            private $email;
            private $year;

            public function __construct(int $hash, string $nome, string $cognome, string $tipo, string $user, 
                string $psw, string $mail, int $anno){
                    $this->hash = hash;
                    $this->name = nome;
                    $this->surname = cognome;
                    $this->type = tipo;
                    $this->username = user;
                    $this->password = psw;
                    $this->email = mail;
                    $this->year = anno;
            }

            public function displayName(){
                echo $this->name;
            }
            public function displayYear(){
                echo $this->year;
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
            public function displayPassword(){
                echo $this->password;
            }

            public function setName($value) {
                $this->name = $value;
            }
            public function setSurname($value){
                $this->surname = $value;
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
            public function setPassword($value){
                $this->password = $value;
            }
    }

?>
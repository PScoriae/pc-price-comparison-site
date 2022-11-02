pipeline {

    agent any
    
    stages {
        stage("Docker Compose Down") {
            steps {
                sh 'sudo docker compose down'
            }
        }

        stage("Docker Compose Up") {
          steps {
            sh 'sudo docker compose up -d --build'
          }
        }
    }
}
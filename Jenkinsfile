pipeline {

    agent any
    
    stages {
        stage("Build Sveltekit App && Deploy") {
            steps {
                sh 'sudo docker compose up -d --build'
            }
        }
    }
}
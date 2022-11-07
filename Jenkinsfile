pipeline {

    agent any
    
    stages {
        stage("Build Sveltekit App && Deploy") {
            steps {
                sh 'sudo docker compose up -d --build'
            }
        }
    }
    // remove old builds
    post {
      always {
        sh 'sudo docker system prune -f'
      }
    }
}
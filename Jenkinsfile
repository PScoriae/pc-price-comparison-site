pipeline {

    agent any
    
    stages {
        stage ("Pull Latest Images") {
            steps {
                sh 'sudo docker compose pull'
            }
        }
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
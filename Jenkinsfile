pipeline {

    agent any
    
    stages {
        stage ("Build SvelteKit App") {
            steps {
                sh 'pnpm i'
                sh 'pnpm build'
            }
        }
        stage ("Run End to End Tests") {
            steps {
                sh 'pnpm test:ci'
            }
        }
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
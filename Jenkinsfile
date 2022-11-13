pipeline {

    agent any

    tools {
        nodejs 'nodejs'
    }

    stages {
        stage ("Build SvelteKit App") {
            steps {
                sh 'pnpm i'
                sh 'pnpm build'
            }
        }
        stage("Build Sveltekit App") {
            steps {
                sh 'sudo docker build -t localhost:5000/pcpartstool:latest'
            }
        }
        stage ("Start Docker Compose") {
            steps {
                sh 'sudo docker compose up -d'
            }
        }
        stage ("Run End to End Tests") {
            steps {
                sh 'pnpm test:ci'
            }
        }
    }

    post {
      success {
        sh 'ansible-playbook -i ansible/inventory ansible/deploy.yaml'
      }
      
      cleanup {
        // tear down test compose
        sh 'sudo docker compose down'

        // remove old builds
        sh 'sudo docker system prune -f'
      }
    }
}
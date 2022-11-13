pipeline {

    agent any

    tools {
        nodejs 'nodejs'
    }

    stages {
        stage ("Run MongoDB") {
            steps {
                sh 'sudo docker run -p 4600:27017 --name mongodb2 -v /PCPartsTool-volume:/data/db -d mongo'
            }
        }
        stage ("Build SvelteKit App") {
            steps {
                sh 'pnpm i'
                sh 'pnpm build'
            }
        }
        stage("Build Docker Container") {
            steps {
                sh 'sudo docker build -t 10.0.1.60:5000/pcpartstool:latest .'
            }
        }
    }

    post {
      success {
        sh 'sudo docker push 10.0.1.60:5000/pcpartstool:latest'
        sh 'sudo ansible-playbook -i ansible/inventory ansible/deploy.yaml'
      }
      
      cleanup {
        // tear down test compose
        sh 'sudo docker stop mongodb2'

        // remove old builds
        sh 'sudo docker system prune -f'
      }
    }
}
pipeline {
    environment{
        USER = credentials('username')
        IP_ADDRESS = credentials('ip_address')
        SSH_CREDENTIALS = credentials('ssh_credentials')
    }
    agent{
        docker{
            image 'node:18-alpine'
            reuseNode true
        }
    }

    stages {
        stage('Build') {
            steps {
                sh '''
                    node --version
                    npm --version
                    npm ci
                '''
            }
        }
        stage('Deploy to VPS') {
            steps {
                sshagent(['ssh_credentials']) { 
                    sh """
                        ssh -o StrictHostKeyChecking=no ${USER}@${IP_ADDRESS} "ls"
                    """
                }
            }
        }
    }
}

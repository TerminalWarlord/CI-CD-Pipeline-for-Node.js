pipeline {
    environment {
        USER = credentials('username')
        IP_ADDRESS = credentials('ip_address')
        SSH_CREDENTIALS = credentials('ssh_credentials')
    }
    agent {
        docker {
            image 'node:latest'
            reuseNode true
        }
    }

    stages {
        stage('Build') {
            steps {
                sh '''
                    node --version
                    npm --version
                '''
            }
        }
        stage('Deploy to VPS') {
            steps {
                sshagent(['ssh_credentials']) { 
                    sh """
                        # Create directory on remote server
                        ssh -o StrictHostKeyChecking=no ${USER}@${IP_ADDRESS} 'mkdir -p ~/jenkins-node'
                        
                        # Copy all files from workspace to remote server
                        scp -o StrictHostKeyChecking=no -r ./* ${USER}@${IP_ADDRESS}:~/jenkins-node/
                        
                        # Optional: Install dependencies and restart app on remote
                        ssh -o StrictHostKeyChecking=no ${USER}@${IP_ADDRESS} '
                            cd ~/jenkins-node
                            npm ci
                            pm2 restart jenkins_node || pm2 start index.js --name jenkins_node
                            pm2 startup
                            sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ${USER} --hp /home/${USER}
                            pm2 save
                        '
                    """
                }
            }
        }
    }
}
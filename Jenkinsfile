pipeline {
    agent any
    tools {nodejs "Nodejs-8.10"}
    stages {
        stage('checkout') {
            steps {
                echo "checking out the code from repository"
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                // nodejs(nodeJSInstallationName: 'Nodejs-8.10', configId: 'jenkins.plugins.nodejs.tools.NodeJSIntallation')
                sh 'npm install'
                echo "Dependencies are installed"
            }
        } 
    }
}
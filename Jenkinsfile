pipeline {
    agent any
    stages {
        stage('checkout') {
            steps {
                echo "checking out the code from repository"
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                def nodeHome = tool name: 'node-8.10', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                echo 'Node Home: ${nodeHome}'
                sh '${nodeHome}/bin/npm install'
                echo "Dependencies are installed"
            }
        } 
    }
}
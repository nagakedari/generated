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
                nodejs(nodeJSInstallationName: 'Node 8.10')
                sh 'npm install'
                echo "Dependencies are installed"
            }
        } 
    }
}
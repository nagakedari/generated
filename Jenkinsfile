pipeline {
    environment {
        bucket = 'kedarideployartifacts3bucketjenkins'
        region = 'eu-east-1'
        stackName = 'dev'
        templateFile = 'sam.yml'
        outputFile = 'sam-output.yml'
    }
    agent any
    tools {nodejs "node8"}
    stages {
        stage('checkout') {
            steps {
                echo "checking out the code from repository"
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                echo "Dependencies are installed"
            }
        }
        stage('build') {
            steps {
                sh 'npm run build'
            }
        } 
        stage('deploy') {
            steps {
                samDeploy([credentialsId: '8829efd3-1754-460b-9a1a-fa7755e1d212', 
                           kmsKeyId: '', outputTemplateFile: '${outputFile}', region: '${region}',
                           s3Bucket: '${bucket}', 
                           s3Prefix: '', 
                           stackName: '${stackName}', 
                           templateFile: './${templateFile}'])
            }
        }
    }
}
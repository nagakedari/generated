pipeline {
    environment {
        credentialsId = 'Aws-Credentials'
        region = 'us-east-1'
        stackName = 'dev'
        bucketName = '-deployartifacts3bucket'
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
                echo "dependencies are installed"
            }
        }
        stage('build') {
            steps {
                sh 'npm run build'
                sh 'npm run test'
                echo 'build step completed successfully'
            }
        } 
        stage('deploy') {
            steps {
                echo "Deploypment has started ......"
                samDeploy([credentialsId: credentialsId, 
                           kmsKeyId: '', outputTemplateFile: outputFile, region: region,
                           s3Bucket: stackName+bucketName, 
                           s3Prefix: '', 
                           stackName: stackName, 
                           templateFile: './'+templateFile])
                echo "Deploypment finished successfully"
            }
        }
    }
}
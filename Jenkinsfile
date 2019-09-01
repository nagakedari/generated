pipeline {
    environment {
        bucket = 'DeployArtifactS3Bucket'
        region = 'eu-east-1'
        functionName = 'StudentFunction'
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
                           kmsKeyId: '', outputTemplateFile: 'sam-output.yml', region: 'us-east-1', 
                        //    roleArn: '', 
                           s3Bucket: 'kedarideployartifacts3bucketjenkins', 
                           s3Prefix: '', 
                           stackName: 'dev', 
                           templateFile: './sam.yml'])
            }
        }
    }
}
pipeline {
    def bucket = 'DeployArtifactS3Bucket'
    def region = 'eu-east-1'
    def functionName = 'StudentFunction'
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
        stage('push artifacts') {
            steps {
                sh "aws s3 cp dist/api.zip s3://${bucket}"
            }
        }
        stage('deploy') {
            steps {
                sh "aws lambda update-function-code --function-name ${functionName} \
                --s3-bucket ${bucket} \
                --s3-key api.zip \
                --region ${region}"
            }
        }
    }
}
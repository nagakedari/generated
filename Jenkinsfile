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
        // stage('push artifacts') {
        //     steps {
        //         // sh "aws s3 cp dist/api.zip s3://${bucket}"
        //         echo "${bucket}"
        //         sh "sam package  --output-template-file sam.yaml --s3-bucket ${bucket}"
        //     }
        // }
        stage('deploy') {
            // steps {
            //     sh "aws lambda update-function-code --function-name ${functionName} \
            //     --s3-bucket ${bucket} \
            //     --s3-key api.zip \
            //     --region ${region}"
            // }

            steps {
                samDeploy([credentialsId: '8829efd3-1754-460b-9a1a-fa7755e1d212', 
                           kmsKeyId: '', outputTemplateFile: '', region: 'us-east-1', 
                           roleArn: '', 
                           s3Bucket: 'deployartifacts3bucket', 
                           s3Prefix: '',
                           templateFile: './sam.yml'])
            }
        }
    }
}
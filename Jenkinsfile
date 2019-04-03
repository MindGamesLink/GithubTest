pipeline {
    agent any
    stages {
        // stage('Pull Repo') {
        //     steps {
        //         sh '''
        //            #!/bin/bash
        //            rm -rf ./*
        //            rm -rf ./.* 2> /dev/null
        //            '''
        //         git 'https://github.com/MindGamesLink/GithubTest.git'
        //     }
        // }
        stage('Build') {
            steps {
                sh '''
                   #!/bin/bash
                   docker-compose up -d
                   '''
            }
        }
        stage('Test') {
            steps {
                sh '''
                   #!/bin/bash
                   docker images
                   docker ps
                   curl -svo /dev/null http://104.238.181.20:3000/
                   '''
                   // Include following above:
                   // node ./integrationTest.js
            }
        }
        // stage('Deploy') {
        //     steps {
        //         //
        //     }
        // }
    }
}

node {
    stage('Git Clone') {
        git 'https://github.com/MindGamesLink/GithubTest'
    }  
    stage('Build') {
        sh label: '',
           script: '''#!/bin/bash
                      id -a''' 
         step([$class: 'DockerComposeBuilder',
                dockerComposeFile: 'docker-compose.yml',
                option: [$class: 'StartAllServices'],
                useCustomDockerComposeFile: true])
    }
    // stage('Test') { 
    //     // 
    // }
    // stage('Deploy') { 
    //     // 
    // }
}


// pipeline {
//     agent any
//     stages {
//         stage('Build') {
//             steps {
//                 sh '''
//                    #!/bin/bash
//                    docker-compose up -d
//                    '''
//             }
//         }
//         stage('Test') {
//             steps {
//                 sh '''
//                    #!/bin/bash
//                    docker images
//                    docker ps
//                    curl -svo /dev/null http://104.238.181.20:3000/
//                    '''
//                    // Include following above:
//                    // node ./integrationTest.js
//             }
//         }
//         // stage('Deploy') {
//         //     steps {
//         //         //
//         //     }
//         // }
//     }
// }

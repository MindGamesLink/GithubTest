// #!/bin/bash
// Test Deploy
//test2
node {
    // stage('Git Clone') {
    //     git 'https://github.com/MindGamesLink/GithubTest'
    // }  
    stage('Build') {
        sh label: '',
           script: '''
                   #!/bin/bash
                   echo $HOME $USER
                   ls /etc/sudoers.d/
                   pwd
                   '''
        echo sh(returnStdout: true, script: 'env')
        //  step([$class: 'DockerComposeBuilder',
        //         dockerComposeFile: 'docker-compose.yml',
        //         option: [$class: 'StartAllServices'],
        //         useCustomDockerComposeFile: true])
    }
}

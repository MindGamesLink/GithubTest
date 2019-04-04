// #!/bin/bash
// Test Deploy
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
        env.getEnvironment()
                      // /var/lib/jenkins /local/home/jenkins/
        //  step([$class: 'DockerComposeBuilder',
        //         dockerComposeFile: 'docker-compose.yml',
        //         option: [$class: 'StartAllServices'],
        //         useCustomDockerComposeFile: true])
    }
}

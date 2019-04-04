// #!/bin/bash
// Test Deploy
node {
    stage('Git Clone') {
        git 'https://github.com/MindGamesLink/GithubTest'
    }  
    stage('Build') {
        sh label: '',
           script: '''#!/bin/bash
                      echo $HOME /home/$USER/
                      pwd()
                      '''
                      // /var/lib/jenkins /local/home/jenkins/
         step([$class: 'DockerComposeBuilder',
                dockerComposeFile: 'docker-compose.yml',
                option: [$class: 'StartAllServices'],
                useCustomDockerComposeFile: true])
    }
}

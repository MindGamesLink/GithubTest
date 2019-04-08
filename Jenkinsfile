//sudo rm -rf ./data/ 2> /dev/null
//git 'https://github.com/MindGamesLink/GithubTest'
node {
    stage('Build') {
        git 'https://github.com/MindGamesLink/GithubTest'
        sh label: '',
           script: '''
                   #!/bin/bash
                   docker stop $(docker ps -a -q) 2> /dev/null
                   docker rmi -f $(docker images -q) 2> /dev/null
                   docker system prune --force
                   sudo docker-compose up -d --force-recreate
                   '''
    }
}


HUGO_PARAMS = ""
pipeline {
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
    skipStagesAfterUnstable()
  }
  agent {
    docker {
      image 'c8y-ubuntu-hugo-deploy:latest'
    }
  }

  environment {

    YUM_SRV = 'yum.cumulocity.com'
    YUM_USR = 'hudson'
    YUM_DEST_DIR = '/var/www/staticpage-guides/guides/'
  }

  stages {
    stage('Build') {
      steps {
        sh "hugo ${HUGO_PARAMS}"
      }
    }
    stage('Deploy') {
      steps {
        sshagent(['hudson-ssh-resources']) {
          sh '''bash --login
          python /docsRepoScanner.py ./
          pwd
          ls
          cp output.json ./public/releases.json
          rsync -avh ./public/* ${YUM_USR}@${YUM_SRV}:${YUM_DEST_DIR} --delete
          '''
          // sh "rsync -avh ./public/* ${env.YUM_USR}@${env.YUM_SRV}:${YUM_DEST_DIR} --delete"
        }
      }
    }
  }
}

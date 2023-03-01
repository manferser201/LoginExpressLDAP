pipeline {
  agent {
    docker {
      args '-p 3000:3000'
      image 'node:lts-alpine'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      agent any
      environment {
        CI = 'true'
      }
      steps {
        sh 'npm test'
      }
    }

  }
}
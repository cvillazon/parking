@Library('ceiba-jenkins-library') _
pipeline {
  //Donde se va a ejecutar el Pipeline
  //agent any
  agent {
    label 'Slave_Induccion'
  }

  //Opciones específicas de Pipeline dentro del Pipeline
  options {
    buildDiscarder(logRotator(numToKeepStr: '3'))
 	disableConcurrentBuilds()
  }

  tools {
    nodejs "NodeJS14"
  }

stages{
    stage('Checkout') {
      steps{
        echo "------------>Checkout<------------"
        checkout scm
      }
    }

     stage('Build npm install') {
      steps {
        echo "------------>Installing<------------"
        sh 'npm install'
      }
    }

    stage('Test Unit') {
      steps {
        echo "------------>Testing<------------"
        sh 'ng test --no-watch --code-coverage --browsers ChromeHeadless'
      }
    }

    stage('Test end-to-end') {
        steps{
            echo "------------>Testing Protractor<------------"
            sh 'ng e2e'
        }
    }

    stage('Static Code Analysis') {
      steps{
            echo '------------>Sonar scan and quality<------------'
		    sonarqubeMasQualityGatesP(sonarKey:'co.com.ceiba.adn:parking.vehiculos.andres.villazon',
            sonarName:'"CeibaADN-ParkingVehiculos(andres.villazon)"',
		    sonarPathProperties:'./sonar-project.properties')
		}
    }

    stage('Build') {
      steps {
        echo "------------>Build<------------"
        sh 'npm run build'
      }
    }
  }
  post {
        failure {
            echo 'pipeline falló'
            mail(
                to: 'andres.villazon@ceiba.com.co',
                body:"Something is wrong with ${env.BUILD_URL}",
                subject: "Failed Pipeline:${currentBuild.fullDisplayName}"
            )
        }
        success {
            echo 'This will run only if successful'
        }
}
}
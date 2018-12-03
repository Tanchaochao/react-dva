properties([gitLabConnection('yq-gitlab-com')])
node {
	try {

		notifySlack()

        stage('Fetch Source Code') {
            currentStage = 'Fetch Source Code'
            def (useless, branchName) = env.JOB_NAME.split('/')
            echo branchName
            git credentialsId: '8d30d020-452e-483c-80d3-d7284556075c', url:'https://gitlab.com/lulupy/edna-frontend.git', branch: branchName
        }
        
        stage('run test'){
            currentStage = 'Run Test'
            docker.image('node:9.9.0').inside(){
                sh 'npm config set registry http://registry.cnpmjs.org'
                sh 'npm install'
                sh 'CI=1 npm run test'
            }
            updateGitlabCommitStatus name: 'Test', state: 'success'
        }

	}
	catch(Exception e) {
		currentBuild.result = 'FAILURE'
		failedDescription = e.toString()
        updateGitlabCommitStatus name: failedDescription, state: 'failed'

		throw e
	}
	finally {
		notifySlack(currentBuild.result)
	}

}

def failedDescription
def currentStage

def notifySlack(String buildStatus = 'Build Started') {

	buildStatus = buildStatus ?: 'SUCCESS'

    def color
    def buildStatusDescription

    if (buildStatus == 'Build Started') {
        color = '#D3D3D3'
        buildStatusDescription = 'Build Started'
    } else if (buildStatus == 'SUCCESS') {
        color = '#00FF00'
        buildStatusDescription = 'Success'
    } else if (buildStatus == 'UNSTABLE') {
        color = '#FFA500'
        buildStatusDescription = 'Unstable'
    } else {
        color = '#FF0000'
        buildStatusDescription = "Failed - while ${currentStage}  description: ${failedDescription}"
    }

    def msg = "_${buildStatusDescription}_: `${env.JOB_NAME}` *#${env.BUILD_NUMBER}* \n${env.BUILD_URL}"

    slackSend(color: color, message: msg)
}

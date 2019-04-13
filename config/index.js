module.exports = {
    //JWT_SECRET: 'wkdaudwn' // 내가 아무거나 정하면 됨 키값같은거?
    JWT_SECRET: 'codeworkrauthentication',
    oauth: {
        google: {
            // https://console.developers.google.com
            // 위의 도메인에서 구글 로그인 후 생성한 클라 정보 입력
            clientID: '480461188243-5g2ot9c2e4r28bat3fbq9r8ad83tr459.apps.googleusercontent.com',
            clientSecret: '3DBxXPR_sfQivZxmVCufRbQQ'
        },
        facebook: {
            clientID: '389531031827409',
            clientSecret: '70e6a628f1a2373d915de0ea31cf2471'
        }
    }
}
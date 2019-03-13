
const jwtReqBody = {
    getReqBody:()=>{
        return 'grant_type=' + envConfig.url.auth0 +
            '&realm=' + envConfig.token.realm +
            '&client_id=' + envConfig.token.clientId +
            '&audience=' + envConfig.url.baseUrl +
            '&username=' + envConfig.users.midWife.username +
            '&password=' + envConfig.users.midWife.password +
            '&scope=';
    } 
    
}
module.exports = jwtReqBody
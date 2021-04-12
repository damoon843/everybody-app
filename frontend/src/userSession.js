const UserSession = (function(){
    let sessionId = "";
    const getSession = function(){
        return sessionId;
    };
    const setSession = function(session){
        sessionId = session
    };
    return {
        getSession: getSession,
        setSession: setSession
    }


})();
export default UserSession
let sessionDataMap = new Map();
module.exports = {
    setData: (key, value) => {
        sessionDataMap.set(key,value)
    },
    getData:(key)=>{
        return sessionDataMap.get(key)
    }
};

let NetUtil = {
  postJson(url, data, callback){
        var fetchOptions = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:data
        };
     
          fetch(url)
          .then((response) => response.json())
          .then((json) => {
            console.log(JSON.stringify(json));
           // let json = require('../data/UserInfo.js');
             callback(json);
           }).catch(function(error){
             callback(error, -1);
           });        
  },
}
export default NetUtil
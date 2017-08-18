var UserSQL = {  
    insert:'INSERT INTO users (uid,userName) VALUES(?,?)', 
    queryAll:'SELECT * FROM users', 
    getUserById:'SELECT * FROM users WHERE uid = ? ',
  };
module.exports = UserSQL;
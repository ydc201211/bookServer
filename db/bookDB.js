var BookSQL = {  
    insert:'INSERT INTO users (uid,userName) VALUES(?,?)', 
    getUserById:'SELECT * FROM users WHERE uid = ? ',
  };
module.exports = BookSQL;
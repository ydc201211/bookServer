var fs = require('fs');
var path = require('path');

var FileUtil = {
    fileTransfer:function (srcPath,desPath) { 
        var dirName = __dirname;
        dirName = dirName.slice(0,dirName.length - 5);
        
        var sourceFile = path.join(dirName,srcPath);
        var destFile = path.join(dirName,desPath);

        fs.rename(sourceFile, destFile, function (err) {
            if (err) 
                
                return false;
            
            fs.stat(destFile, function (err, stats) {
                if (err) 
                    return false;
                console.log('stats: ' + JSON.stringify(stats));
            });
        });
        return true;
    }
   
}
module.exports = FileUtil;
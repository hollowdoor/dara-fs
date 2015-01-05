(function(isNode, _globals){

if(isNode){
    var fs = require("fs");
}

function dara_fs(dara){
    var FS = {};
    
    FS.stats = dara.iterator(function(list, done){
        
        var count = list.length,
            results = [];
        
        this.each(list, function(name, list, index){
            fs.stat(name, function(err, stats){
                results[index] = {
                    name: name,
                    stats: stats,
                    error: err
                };
                
                if(!--count)
                    done(results);
            });
        });
        
    });
    
    dara.mix(FS);
}

if(isNode)
    module.exports = dara_fs;
}else{

    window.dara_fs = function(dara){
        dara.mix(FS);
    };
}

})(typeof module !== 'undefined' && module.exports, this);

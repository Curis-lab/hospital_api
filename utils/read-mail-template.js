'use strict';

import fs from 'node:fs';

fs.readFile('../templates/index.html',(err, data)=>{
    if(err) throw new Error(`Error: ${err}`);
    console.log(data.toString());
});


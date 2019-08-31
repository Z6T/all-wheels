const R = require('path-to-regexp')
console.log(R('/home/user',[],{end:false}))
console.log(R('/',[],{end:false}).test('/home/user/uier'))
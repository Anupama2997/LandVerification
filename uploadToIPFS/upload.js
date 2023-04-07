const pinataSDK = require('@pinata/sdk');
const readline = require("readline-sync");
require('dotenv').config();
const{PinataApiKey ,PinataSecretApiKey} = process.env;
const pinata = pinataSDK(PinataApiKey, PinataSecretApiKey);
pinata.testAuthentication().then((result) => {
    //handle successful authentication here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});

function input(){
    console.log("Enter Mouza Identifications");
var _district = readline.question("Enter District Name: ");
var _block = readline.question("Enter Block Name: ");
var _mouza = readline.question("Enter Mouza Name: ");
const body = {
    district: _district,
    block: _block,
    mouza:_mouza
};
var number;
console.log("Search By Khatian Number or Plot Number");
number = Number( readline.question(" Enter 1 for Khatian Number And 2 for Plot Number"));
if(number == 1){
    console.log("Search By Khatian");
    var _num = Number(readline.question("Enter Khatian Number: "));
    const body1 = {
        khatian: _num,
    };
} else{
console.log("Search By Plot");
var _num = readline.question("Enter Plot Number: ");
const body2 = {
    plot: _num,
};
  
}
const options = {
    pinataMetadata: {
        name: 'author',
        keyvalues: {
            customKey: _num,            
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};
pinata.pinJSONToIPFS(body, options).then((result) => {
    //handle results here
    console.log("input link is https://gateway.pinata.cloud/ipfs/"+result.IpfsHash);
}).catch((err) => {
    //handle error here
    console.log(err);
});
return number;
}
function output(num){
  //  console.log("hjkkk", num);
   // console.log("type", typeof num);
    var s = []; 
    if(num == 1){
    var _khatianNo = Number(readline.question("Enter Khatian Number: "));
    var _owner = readline.question("Enter Owner Name of Land: ");
    var _father = readline.question("Enter Father's or Husband Name: ");
    var _address = readline.question("Enter Address: ");
    var _totalLand = Number(readline.question("Enter Total Land(Acre): "));
    var _totlaPlot = Number(readline.question("Enter Total Number of Plot: "));
    const body = {
        khatianNo: _khatianNo,
        owner: _owner,
        father: _father,
        address: _address,
        totalLand: _totalLand,
        totlaPlot: _totlaPlot
    };
    s.push(body);
    console.log("Related Details of Existance Khatian Number");
    
    j = Number(readline.question("Enter Existance Number"));
    for (var i = 0; i <j; i++) {
        var _plotNo = Number(readline.question("Enter Plot Number: "));
        var _classification = readline.question("Enter Classification of Land: ");
        var _share = Number(readline.question("Enter Share amount: "));
        const body11 = {
            plot: _plotNo,
            classification: _classification,
            share: _share
        };
        s.push(body11);
     }
    }
    else{

    var _plotName = readline.question("Enter Plot Name: ");
    var _classification = readline.question("Enter Classification of Land: ");
    var _area = Number(readline.question("Enter Total Area of Plot Number(Acre): "));
    const body = {
        plotName: _plotName,
        classification: _classification,
        area: _area
    };
    s.push(body);
    console.log("Related Details of Existance Plot Number");
    j = Number(readline.question("Enter Existance Number"));
    for (var i = 0; i <j; i++) {
        var _khatianNo = Number(readline.question("Enter Khatian Number: "));
        var _owner = readline.question("Enter Owner Name of Land: ");
        var _father = readline.question("Enter Father's or Husband Name: ");
        var _share = Number(readline.question("Enter Share amount: "));
        const body1 = {
            Khatian: _khatianNo,
            owner: _owner,
            father: _father,
            share: _share
        };
        s.push(body1);
    }
    }
    const options = {
        pinataMetadata: {
            name: 'author',
            keyvalues: {
                customKey: 1,            
            }
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    const up ={
        data : s
    }
    console.log(up);
    pinata.pinJSONToIPFS(up, options).then((result) => {
        //handle results here
        console.log("Output link is https://gateway.pinata.cloud/ipfs/"+result.IpfsHash);
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
    
    }
num = input()
output(num)
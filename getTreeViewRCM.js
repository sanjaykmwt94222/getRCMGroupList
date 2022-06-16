var distibutors = [];
var filteredDistributors = [];
var pending = [];
var fetchZeroBV = false;
var ignoreInvalidUsers = false;
var pushObj = false;
var greaterThan = 0

function getChild(ID, obj) {
  if (obj) {
    fetchZeroBV = obj.fetchZeroBV;
    greaterThan = obj.BVGreaterThan
    ignoreInvalidUsers = obj.ignoreInvalidUsers;
    pushObj = obj.pushObj;
  }
  fetch('https://www.rcmbusiness.com/Account/GetTreeViewChild?usercode=' + ID + '&_=1594274825533', {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'someheader': 'headervalue'
    })
  })
    .then(res => {
      // console.log("UNPARSED RESPONSE===>",res)
      return res.json();
    })
    .then(res => {
      // console.log("JSON RESPONSE===>",res)
      handleResponse(res);
    });
}

function handleResponse(res) {
  var objToFetch;
  if (res.length) {
    res.forEach((item, i) => {
// Amount: 2854
// AssociateBuyerNumber: 36526733
// ChildNodeCount: 2
// Club: null
// CurrentLevel: null
// Name: "[36526733]  ANIL DILIP SANDANSHIV"
// ParentID: 0
// PinLevel: null
// Pv: 1367
// Sponsor: 36478368
// Status: "KYC OK"
      var dist = item.Name.split("  ");
      var number = item.AssociateBuyerNumber
      var name = dist[1];
      var obj = { id: number, name: name, bv: item.Pv };
      if (i == 0) {
        objToFetch = obj;
      } else {
        pending.push(obj);
      }
      var isInvalid = ignoreInvalidUsers && (obj.name.includes("Terminated") || obj.name.includes("KYC NOT") || obj.name.includes("Not Renew"))
      if (!isInvalid && (!fetchZeroBV || obj.bv == 0)) {
        if (obj.bv >= greaterThan) {
          if (pushObj) {
            distibutors.push(obj);
            console.log(obj, distibutors.length);
          } else {
            var stringToPush = "[" + obj.id + "] " + obj.name;
            if (!fetchZeroBV) stringToPush += " BV:" + obj.bv;
            distibutors.push(stringToPush);
            console.log(stringToPush, distibutors.length);
          }
        }
      } else {
        console.log("Ignored");
      }
      // console.log("DISTRIBUTOR NAME ==>", number, name);
    });
  }
  else if (pending.length) {
    objToFetch = pending.pop();
    // console.log("POPPED===>",objToFetch);
  }
  if (objToFetch) {
    getChild(objToFetch.id);
  } else {
    console.log("COMPLETED");
  }
}

getChild(30109649, {fetchZeroBV: false, ignoreInvalidUsers: true, pushObj: false, BVGreaterThan: 0});

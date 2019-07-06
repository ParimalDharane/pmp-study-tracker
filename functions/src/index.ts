"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const functions = require("firebase-functions");
const admin = require('firebase-admin');
const config = functions.config();

admin.initializeApp(config.firebase);

const db = admin.firestore();


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.helloWorld = functions.https.onRequest((request:any, response:any) => {
    response.send("Hello from Firebase!");
});

exports.setupUsertopics = functions.auth.user().onCreate(async (userRecord:any, context:any) => {
    const uid = userRecord.uid;
    // const usertopicObj = {
    //     userid: uid,
    //     status: 'todo',
    //     code: '10.1',
    //     name: 'topic 10.1'
    // };

    console.log('inside onCreate for user=' + uid);  

    const querySnapshot = await db.collection("topics").get();
      querySnapshot.forEach(topic => {
        const topicData = topic.data();

        const usertopicObj = {
            userid: uid,
            status: 'todo',
            code: topicData.code,
            name: topicData.name
        };

        // usertopicObj.code = topicData.code;
        // usertopicObj.name = topicData.name;
      
        console.log('inside topic lopp code=' + topicData.code);    

        db
        .collection('usertopics')
        .doc(uid)
        .collection('topics')
        .doc()
        .set(usertopicObj)
        .then(function() {
            console.log('Usrtopic added successfully for uid=' + uid + ', topic code=' + topicData.code);    
        })
        .catch(function(error:any) {
            console.log('Error while adding usrtopic for uid=' + uid + ', error=' + error);    
        });
    });
    return true;
});
// Inserts the new user into another table usertopics
/*
exports.insertUsertopics = functions.auth.user().onCreate((userRecord, context) => {
    const uid = userRecord.uid;
    const usertopicObj = {
        userID: uid,
        status: 'todo',
        topicID: '99'
    };
    admin.firestore().doc('usertopics/' + uid).set(usertopicObj);

    console.log('reading topic document v4');
    const ref = admin.database().ref('usertopics/');
    ref.once('value').then(function(snapshot: any) {
        snapshot.forEach(function(childSnapshot: any) {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();

          console.log(childData, 'reading childData: and val=' + childKey + ' status=' + childData.status);
          // ...
        });
      });
    
});
*/
/* Working copy */
/*
exports.insertUsertopics = functions.auth.user().onCreate((userRecord, context) => {
    const uid = userRecord.uid;
    const usertopicObj = {
        userID: uid,
        status: 'todo',
        topicID: '99'
    };
    admin.firestore().doc('usertopics/' + uid).set(usertopicObj);
});
*/


// Inserts list of records into usertopics table for the new user
/*
exports.insertUsertopicsRecs = functions.auth.user().onCreate((userRecord, context) => {
    const uid = userRecord.uid;
    // const lastSignInTime = userRecord.metadata.lastSignInTime; // 2018-01-03T16:23:12.051Z

    var ref = admin.database().ref('topic');
    return ref.on('value').then(function(snapshot: any) {

        const usertopicObj = {
            topicID : snapshot.val().id,
            name : snapshot.val().name,
            area : snapshot.val().area,
            group : snapshot.val().group,
            startDate : '',
            finishDate : '',
            status : 'todo',
            remarks : ''
        };

        return admin.firestore().doc('users/' + uid).set(usertopicObj);
        
    }, function(error: { code: string; }) {
        console.log('Error: ' + error.code);
    })
    
});
*/
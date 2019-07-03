import * as functions from 'firebase-functions';

const admin = require('firebase-admin');
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

// Inserts the new user into another table usertopics
exports.insertUsertopics = functions.auth.user().onCreate((userRecord, context) => {
    const uid = userRecord.uid;
    const usertopicObj = {
        userID: uid,
        status: 'todo',
        topicID: '99'
    };
    admin.firestore().doc('usertopics/' + uid).set(usertopicObj);
});

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
const {ccclass, property} = cc._decorator;
// import firebase from "https://www.gstatic.com/firebasejs/5.3.1/firebase.js";

@ccclass
export default class Authenticator extends cc.Component {

    // onLoad () {}

    start () {
        try {
            // let app = firebase.app();
            // let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
        } catch (e) {
            console.error(e);
        }
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyA3w3VoIODWJ5Hr_mxkLSD8DkcP8L-Z5FM",
            authDomain: "intruderalert-ff.firebaseapp.com",
            databaseURL: "https://intruderalert-ff.firebaseio.com",
            projectId: "intruderalert-ff",
            storageBucket: "intruderalert-ff.appspot.com",
            messagingSenderId: "729690132434"
        };
        //firebase.initializeApp(config);

    }

    // update (dt) {}
}

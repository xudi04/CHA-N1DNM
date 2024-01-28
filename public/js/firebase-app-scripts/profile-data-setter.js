const storage = firebase.storage();
const Database = firebase.database();

const followed = document.querySelector(".about-user span:nth-child(1)");
const follower = document.querySelector(".about-user span:nth-child(2)");
const tab1 = document.querySelector(".tab1");
const tab3 = document.querySelector(".tab3");
const profileImg = document.getElementById("profil-image");
const biggers = document.querySelectorAll(".bigger");   



firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("Hello",user);

        var userId = user.uid;
        var userName = user.displayName;
        var userEmail = user.email;
        localStorage.setItem("user-id", userId);

        const storageRef = storage.ref(userId);

        

        // storageRef.listAll().then(d => {
        //     console.log(userId + "/" + d.items[0].name); // select item 
        //     if (d.items[0]) {
        //         storage.ref(userId + "/" + d.items[0].name).getDownloadURL().then(url => { // get url
        //             profileImg.src = url;
        //             // console.log(url);
        //         }).catch(err => console.log(err.message));
        //     }
        // }).catch(err => console.log(err.message));

        /*/ ========================================= upload profile event ==================================================
        ================================================================================================================*/
        profileImg.addEventListener("click", () => {
            document.getElementById('pi').addEventListener('change', function(e) {
                var file = e.target.files[0];
                if (file) {

                    storageRef.listAll().then(d => {
                        console.log(d.items[0]); // select item 
                        storage.ref(userId + "/"+ d.items[0].name).delete().then(url => { // get url
                            console.log(url);
                        }).catch(err => console.log(err.message));
                    }).catch(err => console.log(err.message));

                    // Create the file metadata
                    var metadata = {
                        contentType: 'image/jpeg'
                    };
                    var uploadTask = storageRef.child(file.name).put(file, metadata);

                    // Listen for state changes, errors, and completion of the upload.
                    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                        }
                    }, 
                    (error) => {
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/unauthorized':
                            console.log('storage/unauthorized');
                            break;
                            case 'storage/canceled':
                            console.log('storage/canceled');
                            break;

                            // ...

                            case 'storage/unknown':
                            console.log('storage/unknown');
                            break;
                        }
                    }, 
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                             profileImg.src = downloadURL;
                             writeData(userId,userName,userEmail,downloadURL);

                        });
                    }
                    );
                } else { console.log("file not");}
            });
        })
        } else {
            window.location.replace("/login");
            console.log("nooo");
    }
});


function writeData(userId,userName,userEmail,downloadURL) {
    Database.ref('us/'+ userId).update({
        username: userName,
        email: userEmail,
        profile_URL : downloadURL,
        userId: userId
    });    
}



var list =[];

function biggerClick(data,key) {
    // var dTitle = data.title;
    // var dText = data.text;
    // var dImg = data.img;
   

    console.log(data,key);


    var screens = document.querySelectorAll(".screen");
    var btns = document.querySelectorAll(".bottom-menu div");
    var area = document.querySelector(".shares");

    screens.forEach(s => {
        if (s.title == "shares") {
            s.classList.toggle("c");
        } else {
            s.classList.remove("c");
        }
    });

    btns.forEach(s => {
        if (s.title == "shares") {
            s.classList.toggle("a");
        } else {
            s.classList.remove("a");
        }
    });

    database.ref("us/"+ data).on("value", (snapshot) => {
        // console.log(snapshot.val());
        var snapval = snapshot.val();
        var shares1 = snapval.shares;

        var rightBtn = document.querySelectorAll("#rightClass");
        var leftBtn = document.querySelectorAll("#leftClass");
        // var shares = document.querySelectorAll(".theArea");

        var titleA = document.querySelector(".theArea h1");
        var textA = document.querySelector(".theArea span");
        var imgA = document.querySelector(".theArea img");

        var jmr = 0;
        list = Object.keys(shares);
        var keyis = 0;

        shareP.src = snapval.profile_URL;
        UID.innerText = snapval.username;

        for (const [key2, value] of Object.entries(shares1)) {
            // console.log(value.title, value.comm, 3, 4, 5, value.image,userId,key);
            list.push(value);
            if (key2 == key) {
                for(let i = 0; i < list.length; i++){if(key == list[i].key){keyis = i;}}
                titleA.innerText = value.title;
                textA.innerText = value.text;
                imgA.src = value.image;
            }
        }

        // onGhr(list);

        rightClass.addEventListener("click", () => {
            if(keyis < list.length -1){keyis++;}
            titleA.innerText = list[keyis].title;
            textA.innerText = list[keyis].text;
            imgA.src = list[keyis].image;
        });
        

        leftClass.addEventListener("click", () => {
            if( keyis > 1 )keyis--;
            titleA.innerText = list[keyis].title;
            textA.innerText = list[keyis].text;
            imgA.src = list[keyis].image;
        });

        
    });

}

function onGhr(arr) {
    var len = arr.length;
    
    function init(){
        if (len < arr.length) {
            len = arr.length;
            // console.log(list);
        }

        // console.log(list);

        requestAnimationFrame(init);
    }

    init();
}




/* element functions */
function addClass(title, exp, like, share, com, img, userId, key) {
    var cls = `
                <div class="my-class-card">
                    <div class="class-text">
                        <h1>`+ title+`</h1>
                        <span>`+ exp +`</span>
                    </div>
                    <div class="about-class">
                        <span><i class="far fa-heart"></i>`+ like +`</span>
                        <span><i class="fas fa-eye"></i> `+ com +` </span>
                        <span><i class="fas fa-comment"></i>`+ share +`</span>
                    </div>
                    <span class="bigger" onclick="biggerClick('`+userId + `','`+key+`')"><i class="fas fa-expand-arrows-alt"></i></span>
                    <img src="`+ img +`" alt="">

                </div>`;

    tab1.innerHTML+=cls;
}

function addClassCard(title, text, like, share, com) {
    var cls = `
                <div class="my-class-card">
                    <div class="card-text">
                        <h1>`+ title+`</h1>
                        <span>`+ text +`</span>
                    </div>
                    <div class="aboutCard">
                        <span><i class="far fa-heart"></i> `+ like+`</span>
                        <span><i class="fas fa-eye"></i>`+ com+` </span>
                        <span><i class="fas fa-comment"></i> `+ share+`</span>
                    </div>
                </div>`;

    tab3.innerHTML+=cls;
}

var userId = localStorage.getItem("user-id");

console.log(userId);

/* get useer profil URL  */
Database.ref("us/" + userId).on("value", (snepshat) => {
    var val = snepshat.val();
    profileImg.src = val.profile_URL;
    followed.innerText = "Takip : " + val.followed;
    follower.innerText = "Takipçi : " + val.follower;
    uid.innerText = val.username;



    var shares = val.shares;
    var liked = val.liked;
    tab1.innerHTML = "";
    
    console.log(shares);
    if (shares) {

        for (const [key, value] of Object.entries(shares)) {
            addClass(value.title, value.comm, 3, 4, 5, value.image,userId, key );
        }
    }

    
});


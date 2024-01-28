const file = document.getElementById("file-input");
const title = document.getElementById("classTitle");
const comm = document.getElementById("classTitle");
const text = document.getElementById("classText");
const type = document.getElementById("type");
const shareBtn = document.querySelector(".share-btn");
const clsImage = document.querySelector("#classImage");

// firebase project var
var database = firebase.database();
var database = firebase.database();
var auth = firebase.auth();

function shareClass(title, text, comm, type) {
    auth.onAuthStateChanged((user) => {
        if (user) {
    
            var userId = user.uid;
            var userName = user.displayName;
            var userEmail = user.email
    
    
            const storageRef = storage.ref(userId + "/classImage/"+ title);
    

                var file1 = file.files[0];
     
                console.log(file1);


                if (file1) {

    
                    // storageRef.listAll().then(d => {
                    //     console.log(d.items[0]); // select item 
                    //     storage.ref(userId + "/classImage/"+ d.items[0].name).delete().then(url => { // get url
                    //         console.log(url);
                    //     }).catch(err => console.log(err.message));
                    // }).catch(err => console.log(err.message));
    
                    // Create the file metadata
                    var metadata = {
                        contentType: 'image/jpeg'
                    };
                    var uploadTask = storageRef.child(file1.name).put(file1, metadata);
    
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
                            // clsImage.src = downloadURL;

                            var key = database.ref("us/" + userId + "/shares" ).push().key;

                            console.log(key);

                            database.ref("us/" + userId + "/shares/" + key).update({
                                key: key,
                                title: title,
                                text: text, 
                                image: downloadURL,
                                type: type,
                                comm: comm
                            });
    
                        });
                    }
                    );
                } else { console.log("file not");}
        } else {
         window.location.replace("/login");
        }
     });
    
}



type.addEventListener("click", () => {
   type.value = "";
});

shareBtn.addEventListener("click", () => {
    var fileURL = file.value; 
    var clsTitle = title.value; 
    var clsComm = comm.value; 
    var clsText = text.value; 
    var clsType = type.value; 

    if (fileURL && clsText != "" && clsTitle != "") {
        console.log(clsComm, clsText, clsTitle, clsType);
        shareClass(clsTitle, clsText, clsComm, clsType);
        setTimeout(() => {
            file.value ="";
            title.value ="";
            text.value ="";
            type.value ="";
        }, 2000);
    } else {
        if (confirm("Boş ders yayımlanmaz çıkış yapılsın mı ? ") == true ) {
            setClass(adderMenu,"toggle", "close");
            setClass(classAdder,"toggle", "close");
        }
    }
    
});




auth.onAuthStateChanged((user) => {
    if (user) {

        var userId = user.uid;
        var userName = user.displayName;
        var userEmail = user.email


        const storageRef = storage.ref(userId + "/classImage/dnm");

        
        file.addEventListener('change', function(e) {
            var file = e.target.files[0];
            if (file) {

                storageRef.listAll().then(d => {
                    console.log(d.items[0]); // select item 
                    storage.ref(userId + "/classImage/dnm/"+ d.items[0].name).delete().then(url => { // get url
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
                    // console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                        // console.log('Upload is paused');
                        break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                        // console.log('Upload is running');
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
                        
                        clsImage.src = downloadURL;

                    });
                }
                );
            } else { console.log("file not");}
        });
    } else {
     window.location.replace("/login");
    }
 });
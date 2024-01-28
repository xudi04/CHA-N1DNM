const img = document.getElementById('img');  
handTrack.load().then(model => { 
    model.detect(img).then(predictions => {
      console.log('Predictions: ', predictions) // bbox predictions
    });
});
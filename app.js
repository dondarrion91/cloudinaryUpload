let imagePreview = document.getElementById("img-preview");
let imageUploader = document.getElementById("img-uploader");
let imgUploadBar = document.getElementById("img-upload-bar");

import CONSTANTES from './variables.js';
console.log(CONSTANTES)


imageUploader.addEventListener("change",async e => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset',CONSTANTES.CLOUDINARY_PRESET);


    const res = await axios.post(CONSTANTES.UPLOAD_URL,formData,{
        headers: {
            'Content-type': 'multipart/form-data'
        },
        onUploadProgress(e) {
            console.log(Math.round((e.loaded*100)/e.total));
            let progress = (e.loaded*100)/e.total;
            imgUploadBar.setAttribute('value',progress);
        }
    })    

    imagePreview.src = res.data.secure_url;
});
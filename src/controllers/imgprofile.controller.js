const path = require("path");
const imgprofileCtrl = {};

imgprofileCtrl.loadImgProfile = async (req, res) => {
    let File = req.files.file;
    File.mv(path.join("src","upload","img_profiles",File.name),
             err => {
        if(err) return res.status(500).send({ message : err })

        return res.status(200).send({ 
            message : 'File upload', 
            name: File.name,
            path: path.join(path.join(__dirname.replace(
            path.join("controllers"), path.join("upload")
        ), 
        path.join("img_profiles",File.name)))
        })
    }) 
};

module.exports = imgprofileCtrl;
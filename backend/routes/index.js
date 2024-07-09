const express = require('express');
const registerController = require('../controller/registerController');
const actorController = require('../controller/actorController');
const directorController = require('../controller/directorController');
const producerController = require('../controller/producerController');
const genreController = require('../controller/genreController');
const filmmakerController = require('../controller/filmmakerController');
const fileuploadController = require('../controller/fileuploadController');
const filmController = require('../controller/filmController');
const festivalController = require('../controller/festivalController');
const sliderController = require('../controller/sliderController');
const dashboardController = require('../controller/dashboardController');
const favoriteController = require('../controller/favoriteController');
const voteController = require('../controller/voteController');
const detailController = require('../controller/detailController');
const searchController = require('../controller/searchController');
const appController = require('../controller/appController');
const categoryController = require('../controller/categoryController');

const multer = require('multer');
const router = express.Router();
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const s3 = new aws.S3({
  accessKeyId: process.env.YOUR_ACCESS_KEY,
  secretAccessKey: process.env.YOUR_SECRET_KEY,
  region: process.env.YOUR_BUCKET_REGION,
  useAccelerateEndpoint: true,
});
const bucketName = process.env.YOUR_BUCKET_NAME;
const upload = multer()
// const s3 = new aws.S3({
//   credentials: {
//     accessKeyId: '',
//     secretAccessKey: '',
//   },
//   region: 'us-east-1',
//   useAccelerateEndpoint: true,
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     //acl: 'public-read',
//     bucket: 'bdm-flimfest-dev',
//     key: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname);
//     },
//   }),
// });

//const upload = multer({ storage });
//router.get('/test',(req,res)=>res.json("working"));
//Register Route
router.post('/register', registerController.register);
//Login Route
router.post('/login', registerController.login);
router.post('/admin-login', registerController.adminLogin);
router.post('/update-user', registerController.updateUser)
router.post('/update-password', registerController.updatePassword);
router.get('/view-all-users', registerController.Alluser)
router.get("/get-user/:id", registerController.getUserById);
router.post("/verify-user", registerController.verifyUser);
router.post("/reset-password", registerController.resetPassword);
router.post("/forgot-password", registerController.forgotPassword);
router.delete("/delete-user/:id", registerController.removeUser);
//Actor

//Add Actor
router.post('/addactor', actorController.AddActor);

router.get('/allactors', actorController.getAllactor);

//delete Acotr
router.delete('/removeactor/:id', actorController.removeActor);
router.get("/get-actor/:id", actorController.getActorById);
//update Actor
router.put('/actorupdate', actorController.updateActor);

//add director
router.post('/add-director', directorController.addDirector);

//fetch director
router.get("/view-all-director", directorController.getAlldirector);

// //delete director
router.delete("/delete-director/:id", directorController.removeDirector);
router.get("/get-director/:id", directorController.getDirectorById);
router.put("/update-director", directorController.updateDirector);

//producer

//add director
router.post('/add-producer', producerController.addProducer);

//fetch director
router.get("/view-all-producer", producerController.getAllproducer);

// //delete director
router.delete("/delete-producer/:id", producerController.removeProducer);

router.get("/get-producer/:id", producerController.getProducerById);
router.put("/update-producer", producerController.updateProducer);

//Genre

router.post("/add-genre", genreController.addGenre);
router.get("/view-all-genre", genreController.getAllgenre);
router.get("/get-genre/:id", genreController.getAllGenreById);
router.delete("/delete-genre/:id", genreController.removeGenre);
router.put("/update-genre", genreController.updateGenre);
//categroy
router.post("/add-category", categoryController.addCategory);
router.get("/view-all-category", categoryController.getAllCategory);
router.get("/get-category/:id", categoryController.getAllCategoryById);
router.delete("/delete-category/:id", categoryController.removeCategory);
router.put("/update-category", categoryController.updateCategory);


//router.post("/add-setting", appController.addAppsetting);
router.get("/get-appsetting/:id", appController.getAppsettingId);
router.put("/update-appsetting", appController.updateApp);

//filmmaker

router.post("/add-filmmaker", upload.single('file'), filmmakerController.addFilmmaker);
router.get("/view-all-filmmaker", filmmakerController.getAllfilmmaker);
router.get("/get-filmmaker/:id", filmmakerController.getFilmmakerById);
router.delete("/delete-filmmaker/:id", filmmakerController.removeFilmmaker);
router.put("/update-filmmaker", upload.single('file'), filmmakerController.updateFilmmaker);

router.post("/add-film", upload.fields([{ name: 'banner', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), filmController.addfilm);

router.get("/view-all-film", filmController.getAllfilm);
router.get("/get-film/:id", filmController.getfilmById);

router.delete("/delete-film/:id", filmController.removefilm);

router.put("/update-film", upload.fields([{ name: 'banner', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), filmController.updatefilm);

//festival
router.post("/add-festival", upload.fields([{ name: 'banner', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), festivalController.addfestival);

router.get("/view-all-festival", festivalController.getAllfestival);
router.get("/get-festival/:id", festivalController.getfestivalById);

router.delete("/delete-festival/:id", festivalController.removefestival);

router.put("/update-festival", upload.fields([{ name: 'banner', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), festivalController.updatefestival);
//endfestival

router.get("/get-slider", sliderController.getSliderData);
router.delete("/remove-slider/:id", sliderController.removeSlider);
router.get("/get-sliderbyId/:id", sliderController.getfilmById);
router.put("/update-slider", sliderController.Sliderupdate)
router.get("/dashboard-detail", dashboardController.dashboradData)
//Api Route
router.get("/home-data/:user_id?", dashboardController.dashboardData);
router.get("/fav/:user_id?", dashboardController.favData);
router.get("/festival-data/:user_id?", festivalController.getfestival);
router.post("/add-favorite", favoriteController.addFavorite);
router.post("/vote", voteController.addVote);
router.get("/slider-data/:user_id?", dashboardController.sliderData);
router.post("/movie-detail", detailController.movieDetail);
router.post("/festival-detail", detailController.festivalDetails);
router.get("/genre-data", genreController.getgenreData);
router.get("/getfilm-bygenre/:id", dashboardController.getFilmByGen);


router.post("/search-data", searchController.getSearchData);

//Content Detail API without user
router.post("/movie-description", detailController.movieDetailInformation);
router.post("/festival-description", detailController.festivalDetailInformation);
router.patch("/update-profile", upload.single('image'), registerController.updateUserProfile);
router.get("/favorite/:user_id", favoriteController.favoriteData);
router.post("/item-detail", detailController.itemDetail);
router.get("/festival-slider/:user_id?", dashboardController.getFestivalSliderData);
router.post("/get-film-by-genre", dashboardController.getGenreFilm);
router.post("/get-search/:user_id?", searchController.getSearchData);


// router.post('/initiateUpload',fileuploadController.initiateUpload);
// router.post('/upload', upload.single("file"),fileuploadController.fileUpload);

// router.post('/completeUpload',fileuploadController.uploadComplete);
router.delete("/remove-file/:id", filmController.removefile);
router.post('/initiateUpload', async (req, res) => {
  try {
    const { fileName } = req.body;
    const params = {
      Bucket: bucketName,
      Key: fileName,
    };
    const upload = await s3.createMultipartUpload(params).promise();
    res.json({ uploadId: upload.UploadId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error initializing upload' });
  }
});

// Receive chunk and write it to S3 bucket
router.post('/upload', upload.single("file"), (req, res) => {
  //console.log("okd");
  const { index, fileName } = req.body;
  const file = req.file;

  const s3Params = {
    Bucket: bucketName,
    Key: fileName,
    Body: file.buffer,
    PartNumber: Number(index) + 1,
    UploadId: req.query.uploadId
  };

  s3.uploadPart(s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: 'Error uploading chunk' });
    }

    return res.json({ success: true, message: 'Chunk uploaded successfully' });
  });
});

// Complete multipart upload
router.post('/completeUpload', (req, res) => {
  const { fileName } = req.query;
  const s3Params = {
    Bucket: bucketName,
    Key: fileName,
    UploadId: req.query.uploadId,
  };

  s3.listParts(s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: 'Error listing parts' });
    }

    const parts = [];
    data.Parts.forEach(part => {
      parts.push({
        ETag: part.ETag,
        PartNumber: part.PartNumber
      });
    });

    s3Params.MultipartUpload = {
      Parts: parts
    };

    s3.completeMultipartUpload(s3Params, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'Error completing upload' });
      }

      //console.log("data: ", data.Key)
      return res.json({ success: true, message: 'Upload complete11', data: data });
    });
  });
});


module.exports = router;
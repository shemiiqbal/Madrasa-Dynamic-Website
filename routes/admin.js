var express = require('express');
var router = express.Router();
const { response } = require('../app');
var MongoClient = require('mongodb').MongoClient
const adminHelpers = require('../helpers/admin-helpers');

/* GET users listing. */
router.get('/', function (req, res, next) {
  let admin = req.session.admin
  if (req.session.admin) {
    adminHelpers.getNames().then((questionnaire) => {

      res.render('admin/students', { admin: true, questionnaire, admin });
    })
  } else {
    res.redirect('admin/adminLogin')
  }
});

router.get('/adminLogin', function (req, res) {
  if (req.session.admin) {
    res.redirect('/admin')
  } else
    res.render('admin/adminLogin', { 'loginErr': req.session.adminLoginErr })
  req.session.adminLoginErr = false
});

router.post('/adminLogin', function (req, res, next) {
  adminHelpers.adminLog(req.body).then((response) => {

    if (response.status) {
      req.session.admin = response.admin
      req.session.admin.loggedIn = true
      res.redirect('/admin');

    } else {
      req.session.adminLoginErr = true
      res.redirect('/admin/adminLogin')
    }
  })
});
router.get('/record/:id', function (req, res) {
  let studId = req.params.id
  adminHelpers.getAlldata(studId).then((studentData) => {
    res.render('admin/record', { admin: true, studentData });
  })


});
router.get('/delete-Data/:id', function (req, res) {
  let studId = req.params.id
  adminHelpers.deleteData(studId).then((response) => {
    res.redirect('/admin/')
  })
});


router.get('/students', function (req, res) {
  res.render('admin/students', { admin: true })
});

router.get('/adminLogout', (req, res) => {
  console.log(req.session.admin)
  req.session.admin = null
  console.log(req.session.admin)
  res.redirect('/admin/adminLogin');
});




module.exports = router;

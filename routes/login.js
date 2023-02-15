var express = require('express');
var LdapAuth= require('ldapauth-fork');
const { use } = require('.');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});


router.post('/auth', (req, res) => {

  let usuario = req.body.username;
  let password = req.body.password;

  let ldap = new LdapAuth({
    url: 'ldap://localhost:389',
    bindDN: 'cn=admin,dc=iesalixar,dc=org',
    bindCredentials: 'passiesalixar',
    searchBase: 'ou=alumnos,dc=iesalixar,dc=org',
    searchFilter: '(uid={{username}})',
    reconnect: true,
  });

  ldap.authenticate(usuario, password, function (err, user) {

    if (err) {

      console.log("Error", err);
      return res.redirect('/login');

    } 

    res.send(`Username: ${user.uid}  DN: ${user.dn}`);
  });
  
});

module.exports = router;
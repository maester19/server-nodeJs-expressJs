const User = require("../models/User")
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.sign = (req, res, next) => {
    var transporter = nodemailer.createTransport({
        host: 'smtp.exemple.com',
        port: 465,  //25,
        // secure: false,
        //service: 'gmail',
        auth: {
          user: 'l\'email de votre serveur smtp ',
          pass: 'votre secret passcode'
        },
        tls: {
          rejectUnauthorized: false
      },
    });

    // var mailOptions = {
    //   from: 'info@afoupconnect.com', 
    //   to: req.body.email, 
    //   subject: "Inscription sur la plateforme afoupConnect", 
    //   text: "Dear "+ req.body.name +
    //         ", You are receiving this email because you have registered on the professional agro-industrial network Afoup Connect (https://www.afoupconnect.com/)." 
    //         +"You will need to verify your account before you can login. Please follow the link below to verify your account. "
    //         +" https://www.afoupconnect.com/account/verify?token=d626dcb2a99f3744008666b344a4acb4 . "
    //         +"With regards, The Afoup Connect Team"
    // };

    // transporter.sendMail(mailOptions, function(error, info){
    //       if (error) {
    //         console.log(error);
    //       } else {
    //         console.log('Email sent: ' + info.response);
    //       }
    //     })
  }

  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            "RANDOM_TOKEN_SECRET",
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };
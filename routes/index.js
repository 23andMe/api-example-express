var request = require('request');

exports.index = function(req, res, scope){
    if (req.signedCookies.access_token) {
        var names, names_by_id = {}, genotypes;
        var base_uri = 'https://api.23andme.com/1';
        var headers = {Authorization: 'Bearer ' + req.signedCookies.access_token};
        request.get({ url: base_uri + '/names/', headers: headers, json: true }, function (e, r, body) {
            if(r.statusCode != 200) {
                res.clearCookie('access_token');
                res.redirect('/');
            } else {
                names = body;
                for (var i = 0; i < names.profiles.length; i++) {
                    names_by_id[names.profiles[i].id] = names.profiles[i].first_name + ' ' + names.profiles[i].last_name;
                }
                request.get({ url: base_uri + '/genotype/?locations=rs2854464', headers: headers, json: true}, function (e, r, body) {
                    genotypes = body;
                    res.render('result', {
                        names: names_by_id,
                        genotypes: genotypes
                    });
                });
            }
        });
    } else {
        res.render('index', {
            client_id: process.env.CLIENT_ID,
            scope: scope,
            redirect_uri: process.env.REDIRECT_URI
        });
    }
};

exports.receive_code = function(req, res, scope){
    if (!req.query.code) {
        res.render('error', {
            client_id: process.env.CLIENT_ID,
            scope: scope,
            redirect_uri: process.env.REDIRECT_URI
        });
    } else {
        // Exchange the code for a token,
        // store it in the session, and redirect.
        request.post({
            url: 'https://api.23andme.com/token/',
            form: {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: req.query.code,
                redirect_uri: process.env.REDIRECT_URI,
                scope: scope
            },
            json: true }, function(e, r, body) {
                if (!e && r.statusCode == 200) {
                    res.cookie('access_token', body.access_token, {signed: true});
                    res.redirect('/');
                } else {
                    res.send(body);
                }
            });
    }
};

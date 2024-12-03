const request = require('request');

module.exports = () => new class IndexController {
    API = 'api/menu'
    getAPIURL = (req, path="") => {
        return `${req.protocol}://${req.get('host')}/${this.API}/${path}`;
    }
    render = (req, res) => {
        request({url: this.getAPIURL(req), method: 'GET'}, (err, result, body) => {
            if(err)
                throw err;

            let categories = [];
            
            try {
                categories = JSON.parse(body);
            } catch {
                // TODO: Error handling.
            }
            
            res.render('index', 
                { 
                    menu: categories ?? [],
                    user: req.user ?? null
                });
        });        
    };
}
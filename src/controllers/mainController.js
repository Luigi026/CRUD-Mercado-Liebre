const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//toThousand : recibe un numero ese numero lo convierte en string y incorpora un punto(.) cada tres caracteres 
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		res.render('index', {
		productsVisited : products.filter(product => product.category  === 'visited'),
		productsInSale : products.filter(product => product.category === 'in-sale'),
		toThousand 
		})
	},
	search: (req, res) => {
		
		const results = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase()))
		/* res.send(results) */ // Con esto verifico que me devuelva lo esperando en archivo json
		res.render('results', {
			results,
			toThousand,
			keywords : req.query.keywords 
		})
	},
};
module.exports = controller;

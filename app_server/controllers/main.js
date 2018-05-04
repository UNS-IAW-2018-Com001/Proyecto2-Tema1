const mongoose = require('mongoose');
//const Pizza = mongoose.model('Pizza');
const Filtro = mongoose.model('filtros');

/* GET home page */
const index = function(req, res) {
	Filtro
		.find()
		.exec((err, Filtro) => {
				res.render('index', {
					title: 'Proyecto1-Tema1',
					filtros: Filtro
				});

		})
};


module.exports = {
  index
}; 

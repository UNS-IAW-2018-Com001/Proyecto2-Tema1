const mongoose = require('mongoose');
const Grupo = mongoose.model('grupos');
const Filtro = mongoose.model('filtros');
const User = mongoose.model('user');

/* GET home page */
const index = function(req, res) {
	Filtro.find().exec((err, Filtro) => {
			Grupo.find().exec((err, Grupo) => {
				res.render('index', {
					title: 'Scouts y Guias en Argentina',
					filtros: Filtro,
					grupos: Grupo,
					user: User
				});
			})
		})
};


module.exports = {
  index
}; 

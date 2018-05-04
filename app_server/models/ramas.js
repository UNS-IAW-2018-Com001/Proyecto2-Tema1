const mongoose = require('mongoose');

const GrupoSchema = new mongoose.Schema({
							nombre:{
								type: String,
								required: true
							},
							GrupoPerteneciente: {
								type: String,
								required: true
							},
							edad_minima: {
								type: Number,
								required: true
							},
							edad_maxima: {
								type: Number,
								required: true
							},
							fechaInscripcion_inicio: {
								type: String,
								required: true
							},
							fechaIscripcion_fin: {
								type: String,
								required: true
							},
							fotos: [String],
							tipo: {
								type: String,
								required: true
							}

						});

mongoose.model('ramas', GrupoSchema);

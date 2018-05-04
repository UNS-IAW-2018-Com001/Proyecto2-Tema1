const mongoose = require('mongoose');

const filtroschema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  opciones: [
     String
]
});

mongoose.model('filtros', filtroschema);

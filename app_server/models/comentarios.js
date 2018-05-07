const mongoose = require('mongoose');

const ComentarioSchema = new mongoose.Schema({
          id: {
            type: String,
            required: true
          },
          perteneciente: {
            type: String,
            required: true
          },
          texto: {
            type: String,
            required: true
          },
          fecha: {
            type: String,
            required: true
          },
          horario: {
            type: String,
            required: true
        },
        imagen: {
          type: String          
      }
        });

mongoose.model('comentarios', ComentarioSchema);

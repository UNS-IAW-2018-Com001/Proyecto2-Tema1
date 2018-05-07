const mongoose = require('mongoose');

const preferenciasSchema = new mongoose.Schema({
          idUser: {
            type: String,
            required: true
          },
          css: {
            type: String,
            required: true
          }

        });

mongoose.model('preferenciasUsuario', preferenciasSchema);

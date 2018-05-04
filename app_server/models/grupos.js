const mongoose = require('mongoose');

const GrupoSchema = new mongoose.Schema({
          nombre: {
            type: String,
            required: true
          },
          codigo: {
            type: Number,
            required: true
          },
          fecha_Creacion: {
            type: String
          },
          horario_Inicio: {
            type: String,
            required: true
          },
          horario_fin: {
            type: String,
            required: true
          },
          sitio_web: {
            type: String,
          },
          telefono: {
            type: Number,
          },
          email: {
            type: String,
          },
          religion: {
            type: String,
            required: true
          },
          ubicacion: {
              calle: {
                type: String,
                required: true
              },
              numero: {
                type: Number,
                required: true
              },
              ciudad: {
                type: String,
                required: true
              },
              pais: {
                type: String,
                required: true
              },
              provincia: {
                type: String,
                required: true
              },
              coords: {
                  type: [Number],
                  index: '2dsphere'
                }
          }

        });

        mongoose.model('grupos', GrupoSchema);

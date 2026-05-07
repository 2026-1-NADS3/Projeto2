const express = require('express')
const cors = require('cors')
require('dotenv').config()

const pacientesRoutes = require('./routes/pacientes')
const consultasRoutes = require('./routes/consultas')
const exerciciosRoutes = require('./routes/exercicios')
const pagamentosRoutes = require('./routes/pagamentos')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/pacientes', pacientesRoutes)
app.use('/consultas', consultasRoutes)
app.use('/exercicios', exerciciosRoutes)
app.use('/pagamentos', pagamentosRoutes)

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API Clínica RPG funcionando!',
    versao: '1.0.0',
    endpoints: ['/pacientes', '/consultas', '/exercicios', '/pagamentos']
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

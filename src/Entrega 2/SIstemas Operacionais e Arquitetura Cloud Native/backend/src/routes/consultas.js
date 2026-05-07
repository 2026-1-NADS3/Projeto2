const express = require('express')
const router = express.Router()
const pool = require('../db')

// GET /consultas - listar todas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, p.nome AS paciente
      FROM consultas c
      JOIN pacientes p ON p.id = c.paciente_id
      ORDER BY c.data, c.horario
    `)
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar consultas', detalhe: err.message })
  }
})

// POST /consultas - agendar consulta
router.post('/', async (req, res) => {
  const { paciente_id, data, horario } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO consultas (paciente_id, data, horario) VALUES ($1, $2, $3) RETURNING *',
      [paciente_id, data, horario]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao agendar consulta', detalhe: err.message })
  }
})

module.exports = router

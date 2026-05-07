const express = require('express')
const router = express.Router()
const pool = require('../db')

// GET /pacientes - listar todos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pacientes ORDER BY id')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar pacientes', detalhe: err.message })
  }
})

// GET /pacientes/:id - buscar por ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pacientes WHERE id = $1', [req.params.id])
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Paciente não encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar paciente', detalhe: err.message })
  }
})

// POST /pacientes - criar novo
router.post('/', async (req, res) => {
  const { nome, idade, email, telefone } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO pacientes (nome, idade, email, telefone) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, idade, email, telefone]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar paciente', detalhe: err.message })
  }
})

module.exports = router

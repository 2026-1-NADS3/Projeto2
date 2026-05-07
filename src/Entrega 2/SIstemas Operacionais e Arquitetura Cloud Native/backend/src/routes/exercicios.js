const express = require('express')
const router = express.Router()
const pool = require('../db')

// GET /exercicios - listar todos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.*, p.nome AS paciente
      FROM exercicios e
      JOIN pacientes p ON p.id = e.paciente_id
      ORDER BY e.id
    `)
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar exercícios', detalhe: err.message })
  }
})

// POST /exercicios - prescrever exercício
router.post('/', async (req, res) => {
  const { paciente_id, nome, descricao, repeticoes, series } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO exercicios (paciente_id, nome, descricao, repeticoes, series) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [paciente_id, nome, descricao, repeticoes, series]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar exercício', detalhe: err.message })
  }
})

module.exports = router

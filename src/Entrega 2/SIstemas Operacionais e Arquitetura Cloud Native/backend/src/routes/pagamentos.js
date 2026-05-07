const express = require('express')
const router = express.Router()
const pool = require('../db')

// GET /pagamentos - listar todos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT pg.*, p.nome AS paciente
      FROM pagamentos pg
      JOIN pacientes p ON p.id = pg.paciente_id
      ORDER BY pg.id
    `)
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar pagamentos', detalhe: err.message })
  }
})

// PATCH /pagamentos/:id/pagar - confirmar pagamento
router.patch('/:id/pagar', async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE pagamentos SET status = 'pago', data_pagamento = NOW() WHERE id = $1 RETURNING *",
      [req.params.id]
    )
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Pagamento não encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao confirmar pagamento', detalhe: err.message })
  }
})

module.exports = router

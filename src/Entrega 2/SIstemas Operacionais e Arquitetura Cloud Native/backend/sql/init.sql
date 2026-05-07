-- Inicialização do banco de dados da Clínica RPG

CREATE TABLE IF NOT EXISTS pacientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  idade INTEGER,
  email VARCHAR(100),
  telefone VARCHAR(20),
  criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS consultas (
  id SERIAL PRIMARY KEY,
  paciente_id INTEGER REFERENCES pacientes(id),
  data DATE NOT NULL,
  horario TIME NOT NULL,
  status VARCHAR(20) DEFAULT 'agendada',
  criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS exercicios (
  id SERIAL PRIMARY KEY,
  paciente_id INTEGER REFERENCES pacientes(id),
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  repeticoes INTEGER,
  series INTEGER,
  criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pagamentos (
  id SERIAL PRIMARY KEY,
  paciente_id INTEGER REFERENCES pacientes(id),
  valor NUMERIC(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pendente',
  data_pagamento DATE,
  criado_em TIMESTAMP DEFAULT NOW()
);

-- Dados de exemplo
INSERT INTO pacientes (nome, idade, email, telefone) VALUES
  ('João Silva', 28, 'joao@email.com', '11999990001'),
  ('Maria Souza', 35, 'maria@email.com', '11999990002');

INSERT INTO consultas (paciente_id, data, horario, status) VALUES
  (1, '2026-05-10', '14:00', 'agendada'),
  (2, '2026-05-12', '10:00', 'agendada');

INSERT INTO exercicios (paciente_id, nome, descricao, repeticoes, series) VALUES
  (1, 'Alongamento Cervical', 'Incline a cabeça lateralmente', 10, 3),
  (2, 'Fortalecimento Lombar', 'Ponte de glúteos no solo', 15, 3);

INSERT INTO pagamentos (paciente_id, valor, status, data_pagamento) VALUES
  (1, 150.00, 'pago', '2026-05-01'),
  (2, 150.00, 'pendente', NULL);

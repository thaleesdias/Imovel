-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);  

-- Tabela de imóveis
CREATE TABLE IF NOT EXISTS imoveis (
    id SERIAL PRIMARY KEY,
    endereco VARCHAR(255) NOT NULL,
    telefone_vendedor VARCHAR(50),
    nome_vendedor VARCHAR(100),
    status VARCHAR(20) DEFAULT 'disponivel' -- disponivel, vendido, alugado
);

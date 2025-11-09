-- Enable pgvector extension for AI/ML embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Create a sample embeddings table (example for future use)
-- Uncomment when ready to use
-- CREATE TABLE IF NOT EXISTS document_embeddings (
--     id SERIAL PRIMARY KEY,
--     document_id INTEGER NOT NULL,
--     embedding vector(1536),  -- OpenAI embedding dimension
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE INDEX ON document_embeddings USING ivfflat (embedding vector_cosine_ops);

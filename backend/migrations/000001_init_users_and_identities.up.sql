CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- USERS
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    email TEXT UNIQUE,
    email_verified BOOLEAN NOT NULL DEFAULT false,

    password_hash TEXT,

    role TEXT NOT NULL DEFAULT 'user'
        CHECK (role IN ('user', 'admin')),

    last_login_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Индекс для активных пользователей (soft delete pattern)
CREATE INDEX idx_users_not_deleted
    ON users (deleted_at)
    WHERE deleted_at IS NULL;

-- USER IDENTITIES (OAuth)
CREATE TABLE IF NOT EXISTS user_identities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    provider TEXT NOT NULL
        CHECK (provider IN ('google', 'yandex', 'telegram', 'vk')),

    provider_user_id TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(provider, provider_user_id)
);

CREATE INDEX idx_user_identities_user_id
    ON user_identities(user_id);
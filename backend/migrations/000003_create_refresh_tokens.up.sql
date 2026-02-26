CREATE TABLE IF NOT EXISTS refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    token_hash TEXT NOT NULL UNIQUE,

    expires_at TIMESTAMPTZ NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    revoked_at TIMESTAMPTZ
);

CREATE INDEX idx_refresh_user_id ON refresh_tokens(user_id);

CREATE INDEX idx_refresh_not_revoked
    ON refresh_tokens(user_id)
    WHERE revoked_at IS NULL;
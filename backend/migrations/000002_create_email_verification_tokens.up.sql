-- EMAIL VERIFICATION TOKENS
CREATE TABLE IF NOT EXISTS email_verification_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- всегда lowercase на уровне backend
    email TEXT NOT NULL,

    token TEXT NOT NULL,

    expires_at TIMESTAMPTZ NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- один активный код на email
    UNIQUE(email)
);

CREATE INDEX idx_email_verification_expires_at
    ON email_verification_tokens(expires_at);
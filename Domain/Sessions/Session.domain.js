const crypto = require('crypto');
const {v4: uuidv4} = require('uuid');

class SessionDomain {
    constructor({
                    id,
                    u_dni,
                    token,
                    session_token,
                    session_token_expires_at,
                    created_at,
                    expires_at,
                    used
                }) {
        this._id = id;
        this._u_dni = u_dni;
        this._token = token;
        this._session_token = session_token;
        this._session_token_expires_at = session_token_expires_at;
        this._created_at = created_at;
        this._expires_at = expires_at;
        this._used = used ?? false;
    }

    static createNew({u_dni, refreshExpiresAt, sessionExpiresAt}) {
        return new SessionDomain({
            id: uuidv4(),
            u_dni,
            token: crypto.randomBytes(32).toString('hex'),
            session_token: '',
            session_token_expires_at: sessionExpiresAt,
            created_at: new Date(),
            expires_at: refreshExpiresAt,
            used: false
        });
    }

    generateSessionToken() {
        const secret = process.env.SESSION_SECRET || 'defaultsecret';
        return crypto
            .createHmac('sha256', secret)
            .update(this._token + Date.now().toString())
            .digest('hex');
    }

    get id() {
        return this._id;
    }

    get u_dni() {
        return this._u_dni;
    }

    get token() {
        return this._token;
    }

    get sessionToken() {
        return this._session_token;
    }

    set sessionToken(value) {
        this._session_token = value;
    }

    get createdAt() {
        return this._created_at;
    }

    get expiresAt() {
        return this._expires_at;
    }

    set expiresAt(value) {
        this._expires_at = value;
    }

    get used() {
        return this._used;
    }

    set used(value) {
        this._used = value;
    }

    get sessionTokenExpiresAt() {
        return this._session_token_expires_at;
    }

    set sessionTokenExpiresAt(value) {
        this._session_token_expires_at = value;
    }

    markUsed() {
        this._used = true;
    }
}

module.exports = SessionDomain;

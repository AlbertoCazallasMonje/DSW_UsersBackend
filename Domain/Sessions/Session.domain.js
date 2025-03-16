const crypto = require('crypto');
const {v4: uuidv4} = require('uuid');

class Session {
    constructor({id, u_dni, token, created_at, expires_at, used = false}) {
        this._id = id;
        this._u_dni = u_dni;
        this._token = token;
        this._created_at = created_at;
        this._expires_at = expires_at;
        this._used = used;
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

    get createdAt() {
        return this._created_at;
    }

    get expiresAt() {
        return this._expires_at;
    }

    get used() {
        return this._used;
    }

    generateSessionToken() {
        const secret = process.env.SESSION_SECRET || 'defaultsecret';
        return crypto.createHmac('sha256', secret)
            .update(this._token)
            .digest('hex');
    }

    static createNew({u_dni, expiresAt}) {
        const id = uuidv4();
        const token = Math.random().toString(36).substring(2, 15);
        const created_at = new Date();
        return new Session({id, u_dni, token, created_at, expires_at: expiresAt, used: false});
    }

    markUsed() {
        this._used = true;
    }
}

module.exports = Session;

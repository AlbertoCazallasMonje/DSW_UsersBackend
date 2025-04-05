// Domain/Actions/PasswordResetToken.domain.js
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

class PasswordResetToken {
    constructor({ id, actionId, token, email, created_at, expires_at, used = false }) {
        this._id = id;
        this._actionId = actionId;
        this._token = token;
        this._email = email;
        this._created_at = created_at;
        this._expires_at = expires_at;
        this._used = used;
    }

    get id() {
        return this._id;
    }
    get actionId() {
        return this._actionId;
    }
    get token() {
        return this._token;
    }
    get email() {
        return this._email;
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

    markUsed() {
        this._used = true;
    }

    static createNew({ actionId, email }) {
        const id = uuidv4();
        const token = crypto.randomBytes(20).toString('hex');
        const created_at = new Date();
        const expires_at = new Date(created_at.getTime() + 3600000);
        return new PasswordResetToken({ id, actionId, token, email, created_at, expires_at, used: false });
    }
}

module.exports = PasswordResetToken;

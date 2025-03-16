const crypto = require('crypto');
const {v4: uuidv4} = require('uuid');

class ActionToken {
    constructor({id, refreshTokenId, actionId, token, created_at, used = false}) {
        this._id = id;
        this._refreshTokenId = refreshTokenId;
        this._actionId = actionId;
        this._token = token;
        this._created_at = created_at;
        this._used = used;
    }

    get id() {
        return this._id;
    }

    get refreshTokenId() {
        return this._refreshTokenId;
    }

    get actionId() {
        return this._actionId;
    }

    get token() {
        return this._token;
    }

    get createdAt() {
        return this._created_at;
    }

    get used() {
        return this._used;
    }

    static createNew({refreshTokenId, actionId}) {
        const id = uuidv4();
        const token = crypto.randomBytes(20).toString('hex');
        const created_at = new Date();
        return new ActionToken({id, refreshTokenId, actionId, token, created_at, used: false});
    }

    markUsed() {
        this._used = true;
    }
}

module.exports = ActionToken;

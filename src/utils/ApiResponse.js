class Response {
    constructor () {
        this.obj = {
            ok: false,
            data: null,
            error: '',
        };
        this.added = {};
    }

    ok (bool) {
        this.obj.ok = !!bool;
        return this.getObj();
    }

    data (data) {
        this.obj.ok = true;
        this.obj.data = data;
        return this.getObj();
    }

    error (str) {
        this.obj.ok = false;
        if (str instanceof Error) {
            this.obj.error = str.message;
        } 
        return this.obj;
    }

    getObj () {
        return Object.keys(this.added).length ? Object.assign(this.obj, this.added) : this.obj;
    }
}

module.exports = Response;

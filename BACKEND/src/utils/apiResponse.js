class apiResponse {
    constructor() {
        this.data = [];
        this.hasError = false;
        this.errors = [];
        this.refreshToken = "";
    }

    setData(data) {
        this.data = data;
    }

    setHasError(hasError) {
        this.hasError = hasError;
    }

    setErrors(errors) {
        this.errors = errors;
        if (errors.length > 0) {
            this.hasError = true;
        }
    }

    setRefreshToken(refreshToken) {
        this.refreshToken = refreshToken;
    }

    getResponse() {
        return {
            data: this.data,
            hasError: this.hasError,
            errors: this.errors,
            refreshToken: this.refreshToken
        };
    }
}

export default apiResponse; // Exportar la clase como "default"
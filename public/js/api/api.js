const API = (() => {
    const BASE_URL = '/api';

    const request = async (endpoint, options = {}) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...( Storage.getToken() && { 'Authorization': `Bearer ${ Storage.getToken() }` }),
                //This acts as a callback.
                ...(options.headers || {})
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw result;
        }

        return result;
    };

    return {
        get(endpoint) {
            return request(endpoint);
        },

        post(endpoint, body) {
            return request(endpoint, {
                method: 'POST',
                body: JSON.stringify(body)
            });
        },

        patch(endpoint, body) {
            return request(endpoint, {
                method: 'PATCH',
                body: JSON.stringify(body)
            });
        },

        put(endpoint, body) {
            return request(endpoint, {
                method: 'PUT',
                body: JSON.stringify(body)
            });
        },

        delete(endpoint) {
            return request(endpoint, {
                method: 'DELETE'
            });
        }
    };
})();
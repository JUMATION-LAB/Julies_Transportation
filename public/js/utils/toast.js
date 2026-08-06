const Toast = (() => {
// console.log('Toast file rendered succesfully.')

    let container;
    
    // console.log('Toast.js passed successfuly.');

    function createContainer() {

        if (document.getElementById('toastContainer')) {
            container = document.getElementById('toastContainer');
            return;
        }

        container = document.createElement('div');

        container.id = 'toastContainer';

        document.body.appendChild(container);

    }

    function show(message, type = 'success', duration = 4000) {

        createContainer();

        const toast = document.createElement('div');

        toast.className = `toast ${type}`;

        toast.innerHTML = `
            <div class="toast-icon">
                ${getIcon(type)}
            </div>

            <div class="toast-content">
                ${message}
            </div>

            <button class="toast-close">
                &times;
            </button>
        `;

        container.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        const timer = setTimeout(() => {
            remove(toast);
        }, duration);

        toast.querySelector('.toast-close')
            .addEventListener('click', () => {

                clearTimeout(timer);

                remove(toast);

            });

    }

    function remove(toast) {

        toast.classList.remove('show');

        toast.classList.add('hide');

        toast.addEventListener('transitionend', () => {

            toast.remove();

        });

    }

    function getIcon(type) {

        switch (type) {

            case 'success':
                return '✓';

            case 'error':
                return '✕';

            case 'warning':
                return '⚠';

            case 'info':
                return 'ℹ';

            default:
                return '';

        }

    }

    return {

        success(message) {

            show(message, 'success');

        },

        error(message) {

            show(message, 'error');

        },

        warning(message) {

            show(message, 'warning');

        },

        info(message) {

            show(message, 'info');

        }

    };

})();








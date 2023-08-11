import './bootstrap';
import '../css/app.css';
import '../css/boutique.css';
import '../css/button.css';
import '../css/dropdown.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';


window.formatterMoney = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#E48515',
        showSpinner: true
    },
});

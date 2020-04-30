import { render } from '@testing-library/vue';
import Vuetify from 'vuetify';

/**
 * Custom container to integrate Vuetify with Vue Testing Library.
 * Vuetify requires you to wrap your app with a v-app component that provides
 * a <div data-app="true"> node.
 *
 * @param {object} component - component to render
 * @param {object} options - options of the component
 * @param {object} callback - callback
 * @returns {object} - The component
 */
export default function renderWithVuetify(component, options, callback) {
  const root = document.createElement('div');
  root.setAttribute('data-app', 'true');

  return render(
    component,
    {
      container: document.body.appendChild(root),
      vuetify: new Vuetify(),
      ...options,
    },
    callback,
  );
}

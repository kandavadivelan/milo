import { html } from '../../../deps/htm-preact.js';
import { heading, user } from '../utils/state.js';

export default function Heading() {
  return html`
    <div class=locui-project-heading>
      <div class=locui-project-heading-column>
        <h2 class=locui-section-label>Project</h2>
        <div class=locui-project-details-project>
          <span>${heading.value.name}</span>
          ${heading.value.editUrl
            && html`
              <a class=locui-project-details-edit
                  href="${heading.value.editUrl}"
                  target="_blank">Edit</a>`}
        </div>
      </div>
      <div class=locui-project-heading-column>
        <h2 class=locui-section-label>LOGGED IN</h2>
        <div class=locui-project-details-name>
          <span>${user}</span>
        </div>
      </div>
    </div>`;
}

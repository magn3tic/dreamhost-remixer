

export default `<style>
								[data-inview="fade-up-in"] {
								  opacity: 0;
								  -webkit-transform: translateY(-40px);
								      -ms-transform: translateY(-40px);
								          transform: translateY(-40px);
								  -webkit-transition: opacity 1.2s linear, -webkit-transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
								  transition: opacity 1.2s linear, -webkit-transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
								  -o-transition: opacity 1.2s linear, transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
								  transition: opacity 1.2s linear, transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
								  transition: opacity 1.2s linear, transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1), -webkit-transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
								  -webkit-transition-delay: 0.15s;
								       -o-transition-delay: 0.15s;
								          transition-delay: 0.15s; }
								  [data-inview="fade-up-in"].is-inview {
								    opacity: 1;
								    -webkit-transform: translateY(0);
								        -ms-transform: translateY(0);
								            transform: translateY(0); }

								[data-inview="children"] > * {
								  opacity: 0;
								  -webkit-transform: translateY(-50px);
								      -ms-transform: translateY(-50px);
								          transform: translateY(-50px);
								  -webkit-transform: translateY(-3rem);
								      -ms-transform: translateY(-3rem);
								          transform: translateY(-3rem);
								  -webkit-transition: opacity 1.2s ease, -webkit-transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
								  transition: opacity 1.2s ease, -webkit-transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
								  -o-transition: opacity 1.2s ease, transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
								  transition: opacity 1.2s ease, transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
								  transition: opacity 1.2s ease, transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1), -webkit-transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1); }
								  [data-inview="children"] > *:nth-child(1) {
								    -webkit-transition-delay: 0.15s;
								         -o-transition-delay: 0.15s;
								            transition-delay: 0.15s; }
								  [data-inview="children"] > *:nth-child(2) {
								    -webkit-transition-delay: 0.3s;
								         -o-transition-delay: 0.3s;
								            transition-delay: 0.3s; }
								  [data-inview="children"] > *:nth-child(3) {
								    -webkit-transition-delay: 0.45s;
								         -o-transition-delay: 0.45s;
								            transition-delay: 0.45s; }
								  [data-inview="children"] > *:nth-child(4) {
								    -webkit-transition-delay: 0.6s;
								         -o-transition-delay: 0.6s;
								            transition-delay: 0.6s; }
								  [data-inview="children"] > *:nth-child(5) {
								    -webkit-transition-delay: 0.75s;
								         -o-transition-delay: 0.75s;
								            transition-delay: 0.75s; }
								  [data-inview="children"] > *:nth-child(6) {
								    -webkit-transition-delay: 0.9s;
								         -o-transition-delay: 0.9s;
								            transition-delay: 0.9s; }
								  [data-inview="children"] > *:nth-child(7) {
								    -webkit-transition-delay: 1.05s;
								         -o-transition-delay: 1.05s;
								            transition-delay: 1.05s; }

								[data-inview="children"].is-inview > * {
								  opacity: 1;
								  -webkit-transform: translateY(0);
								      -ms-transform: translateY(0);
								          transform: translateY(0); }

								[data-inview="imgoverlay"] > figure {
								  opacity: 0;
								  -webkit-transform: translateX(-20%);
								      -ms-transform: translateX(-20%);
								          transform: translateX(-20%);
								  -webkit-transition: -webkit-transform 1.5s cubic-bezier(0.165, 0.84, 0.44, 1);
								  transition: -webkit-transform 1.5s cubic-bezier(0.165, 0.84, 0.44, 1);
								  -o-transition: transform 1.5s cubic-bezier(0.165, 0.84, 0.44, 1);
								  transition: transform 1.5s cubic-bezier(0.165, 0.84, 0.44, 1);
								  transition: transform 1.5s cubic-bezier(0.165, 0.84, 0.44, 1), -webkit-transform 1.5s cubic-bezier(0.165, 0.84, 0.44, 1); }

								[data-inview="imgoverlay"] .dhr-testify--img-overlay {
								  opacity: 0;
								  -webkit-transform: translateX(-100%);
								      -ms-transform: translateX(-100%);
								          transform: translateX(-100%);
								  -webkit-transition: -webkit-transform 1.9s cubic-bezier(0.165, 0.84, 0.44, 1);
								  transition: -webkit-transform 1.9s cubic-bezier(0.165, 0.84, 0.44, 1);
								  -o-transition: transform 1.9s cubic-bezier(0.165, 0.84, 0.44, 1);
								  transition: transform 1.9s cubic-bezier(0.165, 0.84, 0.44, 1);
								  transition: transform 1.9s cubic-bezier(0.165, 0.84, 0.44, 1), -webkit-transform 1.9s cubic-bezier(0.165, 0.84, 0.44, 1); }

								[data-inview="imgoverlay"].is-inview .dhr-testify--img-overlay, [data-inview="imgoverlay"].is-inview figure {
								  opacity: 1;
								  -webkit-transform: translateX(0);
								      -ms-transform: translateX(0);
								          transform: translateX(0); }
          			</style>`;
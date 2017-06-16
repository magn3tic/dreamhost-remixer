
//Library that provides on/off functionality for designers to preview different "versions" of components


window.designerOptions = {};

const isOpen = true,
			$body = $('body');


export default class DesignerOptions {

	constructor(options) {
		this.opts = options.options;
		this.stylesheet = options.stylesheet || false;

		this.writeStylesheet();
		$body.prepend(this.buildUI());
		this.bindUIActions();
	}

	buildUI() {
		let html = '<div id="dopts-panel" class="dopts--panel"><div class="dopts--inner">';
		html += '<div class="dopts--close"><button id="dopts-toggle">Close</button></div>';
		html += '<ul>';
		for (let prop in this.opts) {
			let checked = $body.hasClass('version-'+prop) ? 'checked' : '';
			html += `<li>
								<label for="dopts-input-${prop}">
									<input id="dopts-input-${prop}" name="${prop}" type="checkbox" ${checked}>
									<span>${this.opts[prop]}</span>
								</label>
							</li>`;
			window.designerOptions[prop] = !!(checked.length);
		}
		html += '</ul></div></div>';
		return html;
	}

	writeStylesheet() {
		if (!this.stylesheet) return;
		$body.prepend('<link rel="stylesheet" href="'+this.stylesheet+'">');
	}

	togglePluginProp(prop) {
		window.designerOptions[prop] = window.designerOptions[prop] ? false : true;
	}

	bindUIActions() {
		this.$panel = $('#dopts-panel');
		const $toggle = this.$panel.find('#dopts-toggle'),
					$chkbx = this.$panel.find('input[type="checkbox"]');

		const that = this;
		$chkbx.each(function() {
			const $t = $(this),
						propname = $t.attr('name');

			that.togglePluginProp(propname);
			$t.change(() => $body.toggleClass('version-'+$t.attr('name')));
		});

		$toggle.click(() => this.$panel.toggleClass('dopts--opened'));
	}	

}
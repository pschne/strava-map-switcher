/*
 * Map switcher for Strava website.
 *
 * Copyright © 2016 Tomáš Janoušek.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function(){
	var baseUrl = null;
	if (document.currentScript) {
		var m = document.currentScript.src.match("http.*/");
		if (m) {
			baseUrl = m;
		}
	}

	function getURL(path) {
		if (baseUrl) {
			return baseUrl + path;
		} else {
			return chrome.extension.getURL(path);
		}
	}

	function inject() {
		document.arrive(".leaflet-container", {onceOnly: false, existing: true}, function(){
			var s = document.createElement("script");
			s.src = getURL('fix.js');
			s.type = 'text/javascript';
			s.dataset.googleJsUrl = getURL('Google.js');
			s.dataset.layersUrl = getURL('layers.js');
			document.body.appendChild(s);
		});
		document.arrive(".gm-style", {onceOnly: false, existing: true}, function(){
			var s = document.createElement("script");
			s.src = getURL('fix_google.js');
			s.type = 'text/javascript';
			s.dataset.layersUrl = getURL('layers.js');
			document.body.appendChild(s);
		});
	}

	if (document.currentScript) {
		jQuery.getScript(getURL('arrive.min.js')).done(function(){
			inject();
		});
	} else {
		inject();
	}
})();

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

{
	const baseUrl = document.currentScript.src.match("^[a-z-]+://.*/") + "";
	const getURL = (path) => baseUrl + path;

	const ignoreError = (promise) => new Promise(resolve => { promise.then(resolve, resolve); null; });

	const getScript = (url) => new Promise(function (resolve, reject) {
		const s = document.createElement("script");
		s.src = url;
		s.async = true;
		s.type = 'text/javascript';
		s.onerror = reject;
		s.onload = resolve;
		document.body.appendChild(s);
	});

	Promise.resolve(window.jQuery ? null
		: getScript("https://cdn.jsdelivr.net/npm/jquery@2.2.4/dist/jquery.min.js").then(() => jQuery.noConflict())
	).then(() => Promise.all([
		getScript(getURL('arrive.min.js')),
		getScript(getURL('layers.js')),
		getScript(getURL('donation.js')),
		ignoreError(getScript("https://maps.google.com/maps/api/js?sensor=true&client=gme-stravainc1")).then(
			() => getScript(getURL('Google.js'))),
	])).then(function () {
		getScript(getURL('fix.js'));
		getScript(getURL('fix-mapbox.js'));
	});
}

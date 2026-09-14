const assert = require('assert');
const { escapeHTML } = require('../utils.js');

function testEscapeHTML() {
    // Test null and undefined
    assert.strictEqual(escapeHTML(null), '');
    assert.strictEqual(escapeHTML(undefined), '');

    // Test normal strings
    assert.strictEqual(escapeHTML('normal string'), 'normal string');

    // Test special characters individually
    assert.strictEqual(escapeHTML('&'), '&amp;');
    assert.strictEqual(escapeHTML('<'), '&lt;');
    assert.strictEqual(escapeHTML('>'), '&gt;');
    assert.strictEqual(escapeHTML("'"), '&#39;');
    assert.strictEqual(escapeHTML('"'), '&quot;');

    // Test combinations
    assert.strictEqual(escapeHTML('<div class="test">O\'Reilly & Sons</div>'), '&lt;div class=&quot;test&quot;&gt;O&#39;Reilly &amp; Sons&lt;/div&gt;');

    // Test non-string inputs that get converted to string
    assert.strictEqual(escapeHTML(123), '123');
    assert.strictEqual(escapeHTML(true), 'true');
    assert.strictEqual(escapeHTML({}), '[object Object]');

    console.log('escapeHTML tests passed!');
}

try {
    testEscapeHTML();
    process.exitCode = 0;
} catch (e) {
    console.error(e);
    process.exitCode = 1;
}

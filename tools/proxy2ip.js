export function setupProxy2Ip() {
    const inputElem = document.getElementById('proxyInput');
    const outputElem = document.getElementById('proxyOutput');
    const convertBtn = document.getElementById('convertButton');

    // Auto-resize function
    function autoResize() {
        inputElem.style.height = 'auto';
        inputElem.style.height = inputElem.scrollHeight + 'px';
    }
    inputElem.addEventListener('input', autoResize);
    // Initial resize in case of pre-filled value
    autoResize();

    convertBtn.addEventListener('click', async function () {
        let input = inputElem.value.trim();

        // If textarea is empty, get clipboard text
        if (!input) {
            try {
                input = await navigator.clipboard.readText();
                inputElem.value = input;
                autoResize();
            } catch (e) {
                outputElem.textContent = 'Failed to read clipboard.';
                return;
            }
        }

        const lines = input.split('\n');
        const ips = lines
            .map(line => line.split(':')[0].trim())
            .filter(ip => ip.length > 0);

        const output = ips.join('\n');
        outputElem.textContent = output;

        // Auto copy output to clipboard
        try {
            await navigator.clipboard.writeText(output);
        } catch (e) {
            // Optional: show error or ignore
        }
    });
}
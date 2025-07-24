export function calculateProxy() {
    const inputElem = document.getElementById('noteInput');
    const outputElem = document.getElementById('noteOutput');
    const calcBtn = document.getElementById('calculateButton');

    // Auto-resize function
    function autoResize() {
        inputElem.style.height = 'auto';
        inputElem.style.height = inputElem.scrollHeight + 'px';
    }
    inputElem.addEventListener('input', autoResize);
    // Initial resize in case of pre-filled value
    autoResize();

    calcBtn.addEventListener('click', async function () {
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

        const output = processProxyData(input);
        outputElem.textContent = output;

        // Auto copy output to clipboard
        try {
            await navigator.clipboard.writeText(output);
        } catch (e) {
            // Optional: show error or ignore
        }
    });
}

function processProxyData(inputText) {
    const priceMap = {
        1: 14, // nghìn đồng
        2: 24,
        3: 40
    };

    const proxyStats = {
        1: { newCount: 0, renewCount: 0 },
        2: { newCount: 0, renewCount: 0 },
        3: { newCount: 0, renewCount: 0 }
    };

    const lines = inputText.trim().split('\n');

    for (const line of lines) {
        if (!line.trim()) continue;

        const parts = line.trim().split(/\s+/);
        const text1 = parts[0];
        const newCount = parseInt(parts[1]) || 0;
        const renewCount = parts.length >= 3 ? parseInt(parts[2]) || 0 : 0;

        const id = parseInt(text1.slice(-1));
        if (![1, 2, 3].includes(id)) continue;

        proxyStats[id].newCount += newCount;
        proxyStats[id].renewCount += renewCount;
    }

    const idNames = {
        1: "tuần",
        2: "2 tuần",
        3: "tháng"
    };

    let result = "tổng:\n";
    let formulaParts = [];
    let total = 0;

    for (const id of [1, 2, 3]) {
        const { newCount, renewCount } = proxyStats[id];
        const subTotal = newCount + renewCount;
        if (subTotal === 0) continue;

        result += `proxy ${idNames[id]}: ${newCount} mới + ${renewCount} gia hạn\n`;
        formulaParts.push(`${subTotal}x${priceMap[id]}k`);
        total += subTotal * priceMap[id];
    }

    result += formulaParts.join(' + ') + ` = ${total}k`;

    return result;
}

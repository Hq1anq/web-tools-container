export function multipleCopyCombine() {
    const textElem = document.getElementById('textInput');
    const addBtn = document.getElementById('addButton');
    const copyBtn = document.getElementById('copyButton');

    // Auto-resize function
    function autoResize() {
        textElem.style.height = 'auto';
        textElem.style.height = textElem.scrollHeight + 'px';
    }
    textElem.addEventListener('input', autoResize);
    // Initial resize in case of pre-filled value
    autoResize();

    addBtn.addEventListener('click', async function () {
        let added = await navigator.clipboard.readText();

        if (textElem.value.trim() !== '') textElem.value += '\n' + added.trim();
        else textElem.value = added.trim();

        autoResize();
    });
    copyBtn.addEventListener('click', async function () {
        // Auto copy output to clipboard
        try {
            await navigator.clipboard.writeText(textElem.value.trim());
        } catch (e) {
            // Optional: show error or ignore
        }
    });
}
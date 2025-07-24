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
        navigator.clipboard.writeText(textElem.value.trim())
            .then(() => {
                copyBtn.innerHTML = 'Copied';
                setTimeout(() => {
                    copyBtn.innerHTML = 'Copy';
                }, 2000);
            })
            .catch(err => {
                copyBtn.innerHTML = 'Fail to copy';
                setTimeout(() => {
                    copyBtn.innerHTML = 'Copy';
                }, 1000);
            });
    });
}
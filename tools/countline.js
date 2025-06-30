export function setupCountLine() {
    document.getElementById('countButton').addEventListener('click', async function () {
        try {
            const text = await navigator.clipboard.readText();
            const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
            document.getElementById('lineCountOutput').textContent = `Line count: ${lines.length}`;
        } catch (e) {
            document.getElementById('lineCountOutput').textContent = 'Clipboard access denied.';
        }
    });
}
export function setupMultipleCopy() {
    const startBtn = document.getElementById('startMultipleCopyButton');
    if (!startBtn) return;

    startBtn.addEventListener('click', () => {
        // Prevent multiple injections
        if (window.__multipleCopyActive) return;
        window.__multipleCopyActive = true;

        (function() {
            'use strict';

            const copiedTexts = [];
            let isPaused = false;

            // Store the original clipboard function
            const originalWriteText = navigator.clipboard.writeText.bind(navigator.clipboard);

            // Create container for floating controls
            const mcContainer = document.createElement('div');
            mcContainer.className = 'mc-floating-container';

            // Create a single div for counter and latest text
            const copyCounter = document.createElement('div');
            copyCounter.className = 'mc-floating-counter';

            // Helper to update both count and latest text
            const updateCounter = () => {
                const count = copiedTexts.length;
                let latest = '—';
                if (count > 0) {
                    latest = copiedTexts[count - 1].split(':')[0].trim();
                    if (latest.length > 16) {
                        latest = latest.slice(0, 16) + '…';
                    }
                }
                copyCounter.innerHTML = `
                    <span class="mc-counter-count">Copied: ${count}</span>
                    <span class="mc-counter-latest">${latest}</span>
                `;
            };

            // Override writeText to intercept all clipboard copies
            navigator.clipboard.writeText = async (text) => {
                if (!isPaused && text && typeof text === 'string') {
                    const cleaned = text.trim();
                    if (!copiedTexts.includes(cleaned)) {
                        copiedTexts.push(cleaned);
                        updateCounter();
                    }
                }
                return originalWriteText(text);
            };

            // Also listen to manual copy events (Ctrl+C)
            const onCopy = (e) => {
                if (isPaused) return;
                const selection = window.getSelection().toString().trim();
                if (selection && !copiedTexts.includes(selection)) {
                    copiedTexts.push(selection);
                    updateCounter();
                }
            };
            document.addEventListener('copy', onCopy);

            // Create "Finish Recording" button
            const stopButton = document.createElement('button');
            stopButton.textContent = "Finish";
            stopButton.className = 'mc-floating-btn mc-stop-btn';

            stopButton.addEventListener('click', async () => {
                const finalText = copiedTexts.join('\n');
                try {
                    await originalWriteText(finalText);
                } catch (e) {
                    alert("Failed to write final text to clipboard.");
                }

                // Cleanup
                document.removeEventListener('copy', onCopy);
                navigator.clipboard.writeText = originalWriteText;
                mcContainer.remove();
                window.__multipleCopyActive = false;
            });

            // Create Pause/Resume button
            const pauseButton = document.createElement('button');
            pauseButton.textContent = "Pause";
            pauseButton.className = 'mc-floating-btn mc-pause-btn';

            pauseButton.addEventListener('click', () => {
                isPaused = !isPaused;
                pauseButton.textContent = isPaused ? "Resume" : "Pause";
                pauseButton.classList.toggle('paused', isPaused);
            });

            // Create a button group container for column layout
            const btnGroup = document.createElement('div');
            btnGroup.className = 'mc-btn-group';

            // Append buttons to the group (pause on top, stop below)
            btnGroup.appendChild(pauseButton);
            btnGroup.appendChild(stopButton);

            // Append all to container
            mcContainer.appendChild(copyCounter);
            mcContainer.appendChild(btnGroup);
            document.body.appendChild(mcContainer);
        })();
    });
}
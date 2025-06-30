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

            // UI label for copied count
            const copyCounter = document.createElement('div');
            copyCounter.textContent = "Copied: 0";
            
            document.body.appendChild(copyCounter);

            const updateCounter = () => {
                copyCounter.textContent = `Copied: ${copiedTexts.length}`;
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
            stopButton.textContent = "Finish Recording";

            document.body.appendChild(stopButton);

            stopButton.addEventListener('click', async () => {
                const finalText = copiedTexts.join('\n');
                try {
                    await originalWriteText(finalText);
                    alert("Merged copied text written to clipboard!");
                } catch (e) {
                    alert("Failed to write final text to clipboard.");
                }

                // Cleanup
                document.removeEventListener('copy', onCopy);
                navigator.clipboard.writeText = originalWriteText;
                stopButton.remove();
                copyCounter.remove();
                pauseButton.remove();
                window.__multipleCopyActive = false;
            });

            // Create Pause/Resume button
            const pauseButton = document.createElement('button');
            pauseButton.textContent = "Pause Recording";

            document.body.appendChild(pauseButton);

            pauseButton.addEventListener('click', () => {
                isPaused = !isPaused;
                pauseButton.textContent = isPaused ? "Resume Recording" : "Pause Recording";
            });

            copyCounter.className = 'mc-floating-counter';
            stopButton.className = 'mc-floating-btn mc-stop-btn';
            pauseButton.className = 'mc-floating-btn mc-pause-btn';
        })();
    });
}
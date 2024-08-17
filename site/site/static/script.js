document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('multiSelectForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const select1Value = document.getElementById('select1')?.value;
        const select2Value = document.getElementById('select2')?.value;
        const select3Value = document.getElementById('select3')?.value;
        const select4Value = document.getElementById('select4')?.value;
        const textAreaValue = document.getElementById('textArea').value;

        try {
            const response = await fetch('https://mrtaukita.pythonanywhere.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    select1: select1Value,
                    select2: select2Value,
                    select3: select3Value,
                    select4: select4Value,
                    textArea: textAreaValue
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            // Замена ** на <span class="custom-bold">...</span>
            const htmlContent = result.text.replace(/\*\*(.+?)\*\*/g, '<span class="custom-bold">$1</span>');
            displayFormattedText(htmlContent);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            document.getElementById('result').innerHTML = 'Error generating result';
        }
    });
});

function displayFormattedText(html) {
    const container = document.getElementById('result');
    container.innerHTML = ''; // Очистить контейнер перед вставкой нового текста

    // Отображение текста постепенно
    typeWriter(html, container, 0);
}

function typeWriter(html, container, i) {
    if (i < html.length) {
        // Печатаем текст побуквенно, используя `innerHTML`, чтобы он интерпретировал теги как HTML
        container.innerHTML = html.substring(0, i + 1);
        setTimeout(() => typeWriter(html, container, i + 1), 10); // Скорость печати текста
    }
}
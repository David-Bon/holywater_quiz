export const downloadCsvFromLocalStorage = (quizId: string) => {
    const key = `quiz-${quizId}-answers`;
    const stored = localStorage.getItem(key);
    const filename = `quiz_${quizId}_answers.csv`;
    if (!stored) {
        console.warn('No answers found in localStorage');
        return;
    }

    const data = JSON.parse(stored);
    const entries = Object.entries(data);

    const rows = [
        ['order', 'type', 'title', 'answer'], // CSV header
        ...entries.map(([_, entry], index) => {
            const labels = entry.labels ?? [entry.label];
            const answer = Array.isArray(labels) ? labels.join(', ') : labels;
            return [index + 1, entry.type, entry.title, answer];
        })
    ];

    const csvContent =
        'data:text/csv;charset=utf-8,' +
        rows
            .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
            .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

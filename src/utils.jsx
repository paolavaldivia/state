export const getEmotionDisplay = (emotion) => {
    switch (emotion) {
        case 'happy':
            return '😊';
        case 'thinking':
            return '🤔';
        case 'crazy':
            return '🤪';
        case 'flushed':
            return '😳';
        default:
            return '🙂';
    }
}
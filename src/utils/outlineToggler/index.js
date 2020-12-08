function handleFirstTab(event) {
    if (event.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
        window.addEventListener('click', handleFirstClick);
    }
}

function handleFirstClick() {
    document.body.classList.remove('user-is-tabbing');
    window.removeEventListener('click', handleFirstClick);
    window.addEventListener('keydown', handleFirstTab);
}

export default handleFirstTab;

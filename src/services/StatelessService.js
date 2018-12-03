export function updateState(element, value) {
    this.setState(prevState => ({
        [element]: Object.assign(prevState[element], value)
    }));
}

class KonamiCodeListener
{
    constructor()
    {
        this.keySequence = [
            "ArrowUp",
            "ArrowUp",
            "ArrowDown",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            "ArrowLeft",
            "ArrowRight",
            "KeyB",
            "KeyQ" // equals to "KeyA" on AZERTY keyboard layout
        ];
        this.maxTimeout = 1000;
        this.currentPressedKeys = [];
    }

    listen(callback)
    {
        this.timeout = setTimeout(() => { this.currentPressedKeys = [] }, this.maxTimeout);
        this.callback = callback;

        window.addEventListener("keydown", ev => {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => { this.currentPressedKeys = [] }, this.maxTimeout);
            this._regKey(ev.code);
        });
    }

    _regKey($keyCode)
    {
        this.currentPressedKeys.push($keyCode);
        console.log(this.currentPressedKeys);
        this._checkKeySequence();
    }

    _checkKeySequence()
    {
        if (this.currentPressedKeys.length >= this.keySequence.length) {
            if (JSON.stringify(this.currentPressedKeys) === JSON.stringify(this.keySequence)) {
                this.callback();
            }
            this.currentPressedKeys = [];
        }
    }
}
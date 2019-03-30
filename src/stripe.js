
function createStripe(cont) {
    const canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.height = 10;
    const ctx = canvas.getContext('2d');
    window.addEventListener('resize', draw);
    draw();
    cont.insertBefore(canvas, cont.firstChild);
    function draw () {
        const width = cont.clientWidth;
        canvas.width = width;
        const partLen = width / 5;
        let x = 0;
        let color;
        let curW;
        while (x < width) {
            ctx.fillStyle = "#"+((1<<24)*Math.random()|0).toString(16);
            curW = getRandom(1, partLen);
            ctx.fillRect(x, 0, curW, canvas.height);
            x = x + curW;
        }
    }
    function getRandom(min, max) {
        return (Math.random() * (max - min)) + min;
    }
}

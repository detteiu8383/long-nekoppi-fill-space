class Nekoppi {
  #width = 0;
  #height = 0;
  #target
  #bw
  #vw
  #canvas;
  #ctx
  #background
  constructor(element, background = "#fff", bodyWidth = 40, viewWidth = 30) {
    this.#bw = bodyWidth;
    this.#vw = viewWidth;
    this.#background = background;
    this.#target = element;
    if (this.#target) {
      // 標的要素の子要素を全て削除
      while (this.#target.firstChild) {
        this.#target.removeChild(this.#target.firstChild);
      }

      this.#width = this.#target.clientWidth;
      this.#height = this.#target.clientHeight;
      this.#canvas = document.createElement('canvas');
      this.#canvas.width = this.#width;
      this.#canvas.height = this.#height;
      this.#ctx = this.#canvas.getContext('2d');

      this.#target.appendChild(this.#canvas);
    }
  }

  draw() {
    this.#width = this.#target.clientWidth;
    this.#height = this.#target.clientHeight;
    this.#canvas.width = this.#width;
    this.#canvas.height = this.#height;
    this.#ctx.clearRect(0, 0, this.#width, this.#height);

    this.#ctx.fillStyle = this.#background;
    this.#ctx.fillRect(0, 0, this.#width, this.#height);

    // サイズによって場合分け
    if (this.#width < this.headSize.width || this.#height < this.headSize.height) return

    if (this.bodyHeight < 0 || this.segmentCount < 1) {
      this.drawNoUneuneNekoppi();
    } else {
      this.drawUneuneNekoppi();
    }
  }

  drawUneuneNekoppi() {
    for (let index = 0; index < this.segmentCount; index++) {
      if (index == 0) {
        this.drawLastSegment((this.segmentCount - index - 1) * this.#vw * 2 - this.#vw + this.headSize.width / 4, 1);
      }
      if (index == this.segmentCount - 1) {
        this.drawFirstSegment(- this.#vw + this.headSize.width / 4, 1)
        // this.drawSegment(- this.#vw + this.headSize.width / 4, 0)
      } else {
        this.drawSegment((this.segmentCount - index - 1) * this.#vw * 2 - this.#vw + this.headSize.width / 4, 1);
      }
    }
    this.drawHead(0, this.#height - this.headSize.height);
  }

  drawHead(x, y) {
    this.#ctx.fillStyle = this.#background;
    this.#ctx.fillRect(x, y, 66, 43);

    this.#ctx.font = "12px Meiryo";
    this.#ctx.fillStyle = '#000';
    this.#ctx.fillText('^_____^', x + 4, y + 10);
    this.#ctx.fillText('（三⦿ω⦿三）', x - 8, y + 26);
    this.#ctx.fillText('し　　し', x + 10, y + 42);
  }

  get headSize() {
    return {
      width: 66,
      height: 43
    }
  }

  drawSegment(x, y) {
    // 曲がってるとこ
    this.#ctx.fillStyle = this.#background;
    this.#ctx.strokeStyle = '#000';
    // 上の曲げ部分
    this.#ctx.beginPath();
    this.#ctx.arc(x + this.#vw + this.radius, y + this.radius, this.radius, 0, Math.PI, true);
    this.#ctx.fill();
    this.#ctx.beginPath();
    this.#ctx.arc(x + this.#vw + this.radius, y + this.radius, this.radius, 0, Math.PI, true);
    this.#ctx.stroke();

    // 下の曲げ部分
    this.#ctx.beginPath();
    this.#ctx.arc(x + this.radius, y + this.radius + this.bodyHeight, this.radius, 0, Math.PI, false);
    this.#ctx.fill();
    this.#ctx.beginPath();
    this.#ctx.arc(x + this.radius, y + this.radius + this.bodyHeight, this.radius, 0, Math.PI, false);
    this.#ctx.stroke();

    // 直線部分
    this.#ctx.beginPath();
    this.#ctx.moveTo(x + this.#bw + this.#vw * 2, y + this.radius);
    this.#ctx.lineTo(x + this.#bw + this.#vw * 2, y + this.radius + this.bodyHeight);
    this.#ctx.stroke();

    this.#ctx.beginPath();
    this.#ctx.moveTo(x + this.#vw + this.#bw, y + this.radius);
    this.#ctx.lineTo(x + this.#vw + this.#bw, y + this.radius + this.bodyHeight);
    this.#ctx.stroke();
  }

  drawFirstSegment(x, y) {
    // 曲がってるとこ
    this.#ctx.fillStyle = this.#background;
    this.#ctx.strokeStyle = '#000';
    // 上の曲げ部分
    this.#ctx.beginPath();
    this.#ctx.arc(x + this.#vw + this.radius, y + this.radius, this.radius, 0, Math.PI, true);
    this.#ctx.fill();
    this.#ctx.beginPath();
    this.#ctx.arc(x + this.#vw + this.radius, y + this.radius, this.radius, 0, Math.PI, true);
    this.#ctx.stroke();

    // 直線部分
    this.#ctx.fillRect(x + this.#vw, y + this.radius, this.#bw, this.#height - this.headSize.height / 2 - this.radius);

    this.#ctx.beginPath();
    this.#ctx.moveTo(x + this.#bw + this.#vw * 2, y + this.radius);
    this.#ctx.lineTo(x + this.#bw + this.#vw * 2, y + this.radius + this.bodyHeight);
    this.#ctx.stroke();

    this.#ctx.beginPath();
    this.#ctx.moveTo(x + this.#vw + this.#bw, y + this.radius);
    this.#ctx.lineTo(x + this.#vw + this.#bw, y + this.#height - this.headSize.height / 2);
    this.#ctx.stroke();

    this.#ctx.beginPath();
    this.#ctx.moveTo(x + this.#vw, y + this.radius);
    this.#ctx.lineTo(x + this.#vw, y + this.#height - this.headSize.height / 2);
    this.#ctx.stroke();
  }

  drawLastSegment(x, y) {
    // 直線部分
    this.#ctx.beginPath();
    this.#ctx.moveTo(x + this.#bw + this.#vw * 2, y + this.radius + this.bodyHeight);
    this.#ctx.lineTo(x + this.#bw + this.#vw * 2, y + this.#height - this.headSize.height / 2);
    this.#ctx.stroke();

    this.#ctx.font = "12px Meiryo";
    this.#ctx.fillStyle = '#000';
    this.#ctx.fillText('し　　し', x + this.#vw * 2 + this.#bw - 45, this.#height - 1);
    this.#ctx.save();
    this.#ctx.translate(x + this.#vw * 2 + this.#bw, y + 1);
    this.#ctx.rotate(Math.PI)
    this.#ctx.fillText('し', 0, 0);
    this.#ctx.restore();
  }

  get radius() {
    return (this.#bw + this.#vw) / 2;
  }

  get bodyHeight() {
    return this.#height - this.headSize.height / 4 - this.radius * 2;
  }

  get segmentCount() {
    return Math.ceil((this.#width - (this.#bw + this.#vw + this.headSize.width / 4)) / (this.#vw * 2));
  }

  drawNoUneuneNekoppi() {
    // 直線部分
    this.#ctx.beginPath();
    this.#ctx.moveTo(this.headSize.width, 30);
    this.#ctx.lineTo(this.#width - 15, 30);
    this.#ctx.stroke();

    this.#ctx.beginPath();
    this.#ctx.moveTo(this.headSize.width, this.#height - 12);
    this.#ctx.lineTo(this.#width - 15, this.#height - 12);
    this.#ctx.stroke();

    this.#ctx.font = "12px Meiryo";
    this.#ctx.fillStyle = '#000';
    this.#ctx.fillText('し　　し', this.#width - 50, this.#height - 1);
    this.#ctx.save();
    this.#ctx.translate(this.#width, 15);
    this.#ctx.rotate(Math.PI)
    this.#ctx.fillText('し', 0, 0);
    this.#ctx.restore();

    this.drawHead(0, this.#height - this.headSize.height);
  }
}
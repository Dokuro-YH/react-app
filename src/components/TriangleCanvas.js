import React, { Component } from 'react';

const w = window.innerWidth;
const h = window.innerHeight;
const pr = window.devicePixelRatio || 1;
const f = 100;
const m = Math;
const u = m.PI * 2;
const v = m.cos;
const z = m.random;

function y(p) {
  const t = p + (z() * 2 - 1.1) * f;
  return (t > h || t < 0) ? y(p) : t;
}

class TriangleCanvas extends Component {
  componentDidMount() {
    if (!this.c || !this.x) { return; }
    const c = this.c;
    const x = this.x;
    c.width = w * pr;
    c.height = h * pr;
    x.scale(pr, pr);
    x.globalAlpha = 0.6;
    this.init();
  }

  init = () => {
    const x = this.x;
    x.clearRect(0, 0, w, h);
    let r = 0;
    let q = [{ x: 0, y: h * 0.7 + f }, { x: 0, y: h * 0.7 - f }];

    while (q[1].x < w + f) {
      r -= u / -50;
      const [i, j] = q;
      const k = j.x + (z() * 2 - 0.25) * f;
      const n = y(j.y);
      this.draw(i, j, k, n, r);
      q = [j, { x: k, y: n }];
    }
  }

  draw = (i, j, k, n, r) => {
    const x = this.x;
    x.beginPath();
    x.moveTo(i.x, i.y);
    x.lineTo(j.x, j.y);
    x.lineTo(k, n);
    x.closePath();
    x.fillStyle = `#${(v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)}`;
    x.fill();
  }

  saveCanvas = (canvas) => {
    if (!canvas) { return; }
    this.c = canvas;
    this.x = canvas.getContext('2d');
  }

  render() {
    return (
      <canvas
        ref={this.saveCanvas}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    );
  }
}

export default TriangleCanvas;

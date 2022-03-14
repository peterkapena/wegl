const canvas = document.querySelector("canvas");
// canvas.width  = window.innerWidth-20;
// canvas.height = window.innerHeight-20;

const webgl = canvas.getContext("webgl");

if (!webgl) {
  throw new Error("WebGL not available/supported");
}

webgl.clearColor(0, 0, 0, 0.7);

webgl.clear(webgl.COLOR_BUFFER_BIT);
const sides = 16;
const vertices = new Float32Array(getValues(sides));

const buffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(
  vertexShader,
  `attribute vec2 pos;
  attribute vec4 colours;
  varying vec4 vcolours;
  uniform float xshift;
  uniform float yshift;
    void main(){
        gl_Position = vec4(pos, 0, 1) + vec4(xshift, yshift, 0, 0);
        vcolours = colours;
    }
`
);
webgl.compileShader(vertexShader);

const fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
webgl.shaderSource(
  fragmentShader,
  `precision mediump float;
  varying vec4 vcolours;
  void main(){
      gl_FragColor = vcolours;
  }
`
);
webgl.compileShader(fragmentShader);

const program = webgl.createProgram();
webgl.attachShader(program, vertexShader);
webgl.attachShader(program, fragmentShader);
webgl.linkProgram(program);

const positionLocation = webgl.getAttribLocation(program, "pos");
webgl.enableVertexAttribArray(positionLocation);
webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);

const colourBuffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, colourBuffer);
webgl.bufferData(webgl.ARRAY_BUFFER, colours(sides), webgl.STATIC_DRAW);

const coloursLocation = webgl.getAttribLocation(program, "colours");
webgl.enableVertexAttribArray(coloursLocation);
webgl.vertexAttribPointer(coloursLocation, 4, webgl.FLOAT, false, 0, 0);

webgl.useProgram(program);

let xs = 0.75;
let ys = 0.75;

draw();

const incrOrDecrValue = 0.125;

document.onkeydown = (event) => {
  let redraw = true;
  switch (event.key) {
    case "ArrowDown":
      ys -= incrOrDecrValue;
      break;

    case "ArrowUp":
      ys += incrOrDecrValue;
      break;

    case "ArrowLeft":
      xs -= incrOrDecrValue;
      break;

    case "ArrowRight":
      xs += incrOrDecrValue;
      break;
    default:
      redraw = false;
      break;
  }
  if (redraw) draw();
};

function draw() {
  webgl.clear(webgl.COLOR_BUFFER_BIT);
  webgl.bufferData(webgl.ARRAY_BUFFER, colours(sides), webgl.STATIC_DRAW);
  webgl.uniform1f(webgl.getUniformLocation(program, "xshift"), xs);
  webgl.uniform1f(webgl.getUniformLocation(program, "yshift"), ys);
  webgl.drawArrays(webgl.TRIANGLE_FAN, 0, vertices.length / 2);
  window.requestAnimationFrame(draw)
}

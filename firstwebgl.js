const canvas = document.querySelector("canvas");

const webgl = canvas.getContext("webgl");

if (!webgl) {
  throw new Error("WebGL not available/supported");
}

webgl.clearColor(0.5, 0.5, 0.5, 0.7);

webgl.clear(webgl.COLOR_BUFFER_BIT);

const vertices = new Float32Array(getValues(16));

const buffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(
  vertexShader,
  `attribute vec2 pos;
    void main(){
        gl_Position = vec4(pos, 0, 1);
    }
`
);
webgl.compileShader(vertexShader);

const fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
webgl.shaderSource(
  fragmentShader,
  `void main(){
      gl_FragColor = vec4(1.0, 0, 0, 1.0);
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
webgl.useProgram(program);
webgl.drawArrays(webgl.TRIANGLE_FAN, 0, vertices.length / 2);

function getValues(numberOfSides) {
  if (!numberOfSides) throw new Error("Please specify the number of sides");
  
  const r = 0.5;
  let values = [0.0, 0.0, r, 0.0];
  
  for (let index = 1; index < numberOfSides + 1; index++) {
    values = [
      ...values,
      r * Math.cos((index * Math.PI) / 4),
      r * Math.sin((index * Math.PI) / 4),
    ];
  }

  return values;
}

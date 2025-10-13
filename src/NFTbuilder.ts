import fs from "fs";
import path from "path";

export default class NFTbuilder {
  constructor() {}

  generate() {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000" style="background-color:#3a3a3a">
    <defs>
        <filter id="glow">
        <feDropShadow dx="0" dy="0" stdDeviation="0" flood-color="white"/>
        </filter>
    </defs>

    <style>
        .text { fill: white; font-family: monospace; font-size: 32px; text-anchor: middle; dominant-baseline: middle; font-weight: normal; }
        .small { font-size: 32px; font-weight: normal; }
        .edge-front { stroke: white; stroke-width: 3; fill: none; stroke-opacity: 1; }
        .edge-back  { stroke: white; stroke-width: 1.5; fill: none; stroke-opacity: 0.4; stroke-dasharray: 4 2; }
        .rib        { stroke: white; stroke-width: 1; stroke-opacity: 0.2; }
    </style>

    <!-- Центр: x=500, y=500 -->
    <!-- Заголовок -->
    <text x="500" y="200" class="text">HASH</text>
    <text x="500" y="240" class="text small">#0000</text>

    <!-- Куб с glow -->
    <g filter="url(#glow)">
        <!-- Передние грани -->
        <polygon class="edge-front" points="500,300 600,350 600,450 500,400" />
        <polygon class="edge-front" points="500,300 400,350 400,450 500,400" />
        <polygon class="edge-front" points="400,450 500,500 600,450 500,400" />

        <!-- Задние/верхние грани -->
        <polygon class="edge-back" points="500,300 600,350 500,400 400,350" />
        <polygon class="edge-back" points="400,350 400,450 500,500 500,400" />
        <polygon class="edge-back" points="600,350 600,450 500,500 500,400" />

        <!-- Внутренние рёбра -->
        <line class="rib" x1="400" y1="350" x2="600" y2="450" />
        <line class="rib" x1="600" y1="350" x2="400" y2="450" />
        <line class="rib" x1="500" y1="300" x2="500" y2="500" />
    </g>

    <!-- Подпись -->
    <text x="500" y="600" class="text">ARTEFACT</text>
    </svg>
`;
  }

  save(svg: string, filename = "artefact.svg") {
    const outputPath = path.resolve(process.cwd(), filename);
    fs.writeFileSync(filename, svg, "utf-8");
    console.log(`📝 SVG saved to ${outputPath}`);
  }
}

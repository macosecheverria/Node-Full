import fs from "fs";
import { yarg } from "./config/plugins/yargs.plugins";

const {b, s, l} = yarg;

let show: boolean = s;
let ouputMessage: string = "";
const base: number = b;
let headerMessage = ` 
====================
Tabla del 5
====================
`;

for (let i = 1; i <= l; i++) {
  ouputMessage += `${base} x ${i} =  ${base * i}\n`;
}

ouputMessage = headerMessage + ouputMessage;



if(show) console.log(ouputMessage);

const outputPath = "outputs";

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, ouputMessage);
console.log("File created");

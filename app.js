
const PizZip = require("pizzip");
const fs = require("fs");
const path = require("path");
const fileUpload = require('./utils/GoogleApi');
const DocTemplater = require('./utils/DocTemplater');

const templateName = "contrato-bolt.docx";
const filePath = path.resolve(__dirname, "templates", templateName);

const contentFile = fs.readFileSync(filePath, "binary");

//zip file
const zip = new PizZip(contentFile);

// render and replace de document
const data = {
  "Razão Social": "CIRNE IRMAOS & CIA LTDA",
  "Nome Fantasia": "Iskisita Atacado",
  "CNPJ": "08.326.720/0001-53",
  "Endereço": "Rua Leonel Leite, 1415 Fd R. C. Estevam 1424, ALECRIM NATAL - RN",
  "CEP": "59037-820",
  "Telefone": "(84) 3203-5700",
  "E-mail": "iskisita@iskisita.com.br",
  "Responsável": "Josebel da Costa Cirne",
  "CPF": "012.670.064-58",
};
const docTemplater = new DocTemplater(zip, data, {start: "{{", end: "}}"})
const buffer = docTemplater.createFile(path.resolve(__dirname, "templates", "testando.docx"))

fileUpload(
  'template_teste',
  '1gRDNFxkcclc7mD0uINEvWfn0AqHmyanB', 
  buffer, 
  path.resolve(__dirname, './google_api_credential.json'))
  .then(id => console.log(id));

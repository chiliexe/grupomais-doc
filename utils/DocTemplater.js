const Docx = require("docxtemplater");
const fs = require('fs');

class DocTemplater {

    constructor(zipFile, data, delimiters = {start: "{{", end: "}}"}){
        this.zipFile = zipFile;
        this.data = data;
        this.delimiters = delimiters;
        this.doc = new Docx(zipFile, { 
            paragraphLoop: true,
            linebreaks: true,
            delimiters 
        });

        this.doc.render(this.data);
    };

    getBuffer(){
        const buffer = this.doc.getZip().generate({
            type: "nodebuffer",
            // compression: DEFLATE adds a compression step.
            // For a 50MB output document, expect 500ms additional CPU time
            compression: "DEFLATE",
        });

        return buffer;
    }

    createFile(filePath){
        const buffer = this.getBuffer();
        fs.writeFileSync(filePath, buffer);
        return buffer;
    }


}

module.exports = DocTemplater;
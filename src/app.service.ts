import { Injectable } from '@nestjs/common';
import * as libre from 'libreoffice-convert';
import * as stream from 'stream';
import * as mammoth from 'mammoth';
import * as puppeteer from 'puppeteer';
@Injectable()
export class AppService {
  async changeFileType(
    file: Express.Multer.File
  ) {

      // const pdfBuf = await new Promise<Buffer>((resolve,reject)=>{
      //   libre.convert(file.buffer,".pdf",undefined,(err,done)=>{
      //     if(err){
      //       console.log(`Error converting file: ${err}`)
      //     }
      //     resolve(done)
      //   })
      // })

      // const bufferStream = new stream.PassThrough();
      // bufferStream.end(pdfBuf);
   
      // const pdfFile: Express.Multer.File = {
      //     fieldname: 'file',
      //     originalname: 'output.pdf',
      //     encoding: '7bit',
      //     mimetype: 'application/pdf',
      //     buffer: pdfBuf,
      //     size: pdfBuf.length,
      //     stream: bufferStream,
      //     destination: '',
      //     filename: '', 
      //     path: '', 
      // };
      

      // const pngbuff = await new Promise<Buffer>((resolve,reject)=>{
      //   libre.convert(pdfBuf,".png",undefined,(err,done)=>{
      //     if(err){
      //       console.log(`Error converting file: ${err}`)
      //     }
      //     resolve(done)
      //   })
      // })

     
     
      // const photoBufferStream = new stream.PassThrough();
      // photoBufferStream.end(pdfBuf);
   
      // const photo: Express.Multer.File = {
      //     fieldname: 'file',
      //     originalname: 'output.png',
      //     encoding: '7bit',
      //     mimetype: 'image/png',
      //     buffer: pngbuff,
      //     size: pngbuff.length,
      //     stream: photoBufferStream,
      //     destination: '',
      //     filename: '', 
      //     path: '', 
      // };

      // return photo
      const { value: html } = await mammoth.convertToHtml({ buffer: file.buffer });

      // Convert HTML to PDF using Puppeteer
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
  
      await page.setContent(html);
      const pdfBuffer = await page.pdf({ format: 'A4' });
    
      await browser.close();
      const bufferStream = new stream.PassThrough();
      bufferStream.end(pdfBuffer);
      const pdfFile: Express.Multer.File = {
          fieldname: 'file',
          originalname: 'output.pdf',
          encoding: '7bit',
          mimetype: 'application/pdf',
          buffer: Buffer.from(pdfBuffer),
          size: pdfBuffer.length,
          stream: bufferStream,
          destination: '',
          filename: '', 
          path: '', 
      };
      return pdfFile
  }


}

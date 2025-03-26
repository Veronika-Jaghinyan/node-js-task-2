import fs from 'fs';
import { Transform } from 'stream';

class UppercaseTransformStream extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    try {
      const formattedStr = chunk.toString().toUpperCase() + '\n';
      this.push(formattedStr);
      callback();
    } catch (error) {
      callback(error);
    }
  }
}

function startStream() {
  const readStream = fs.createReadStream('./streams/input.txt');
  const writeStream = fs.createWriteStream('./streams/output.txt', { flags: 'a' });
  const formattedStream = new UppercaseTransformStream();

  readStream.pipe(formattedStream).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('Uppercase text successfully copied to output.txt');
  });
}

startStream();

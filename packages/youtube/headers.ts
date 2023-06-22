import { StringDecoder } from "node:string_decoder";
import { Readable } from "stream";

// Pull off a header delimited by \n\n.
// Use unshift() if we get too much.
// Call the callback with (error, header, stream).
export const parseHeader = (stream: Readable, callback: (error: Error | null, header: string, stream: Readable) => void): void => {
    stream.on('error', callback);
    stream.on('readable', onReadable);
    const decoder = new StringDecoder('utf8');
    let header = '';
    function onReadable() {
        let chunk;
        while (null !== (chunk = stream.read())) {
            const str = decoder.write(chunk);
            if (str.includes('\n\n')) {
                // Found the header boundary.
                const split = str.split(/\n\n/);
                header += split.shift();
                const remaining = split.join('\n\n');
                const buf = Buffer.from(remaining, 'utf8');
                stream.removeListener('error', callback);
                // Remove the 'readable' listener before unshifting.
                stream.removeListener('readable', onReadable);
                if (buf.length)
                    stream.unshift(buf);
                // Now the body of the message can be read from the stream.
                callback(null, header, stream);
                return;
            }
            // Still reading the header.
            header += str;
        }
    }
};
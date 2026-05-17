/**
 * scanfile action handler
 *
 * Receives a file via the openai/fileParams mechanism:
 *   fileToBeScanned: { download_url, file_id, mime_type, file_name }
 *
 * Fetches the file from download_url, reads its contents, and returns
 * basic metadata + a text preview so we can verify the file arrived correctly.
 */

const https = require('https');
const http = require('http');

const MAX_PREVIEW_CHARS = 1000;
const MAX_DOWNLOAD_BYTES = 1024 * 1024; // 1 MB safety cap

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} fetching file`));
      }

      const chunks = [];
      let totalBytes = 0;

      res.on('data', chunk => {
        totalBytes += chunk.length;
        if (totalBytes > MAX_DOWNLOAD_BYTES) {
          req.destroy();
          reject(new Error(`File exceeds ${MAX_DOWNLOAD_BYTES / 1024}KB safety cap`));
          return;
        }
        chunks.push(chunk);
      });

      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    req.on('error', reject);
  });
}

function isTextMime(mimeType) {
  if (!mimeType) return false;
  return mimeType.startsWith('text/') ||
    mimeType === 'application/json' ||
    mimeType === 'application/xml' ||
    mimeType === 'application/javascript' ||
    mimeType === 'application/x-yaml';
}

module.exports = async ({ fileToBeScanned }) => {
  if (!fileToBeScanned) {
    return { content: [{ type: 'text', text: 'No file was provided. Please attach a file and try again.' }] };
  }

  const { download_url, file_id, mime_type, file_name } = fileToBeScanned;

  if (!download_url) {
    return { content: [{ type: 'text', text: 'File reference is missing a download URL.' }] };
  }

  let buffer;
  try {
    buffer = await fetchUrl(download_url);
  } catch (err) {
    return { content: [{ type: 'text', text: `Could not download file: ${err.message}` }] };
  }

  const sizeBytes = buffer.length;
  const looksLikeText = isTextMime(mime_type) || (mime_type == null && sizeBytes < 64 * 1024);

  let fileContent;
  if (looksLikeText) {
    try {
      const text = buffer.toString('utf8');
      fileContent = text.length > MAX_PREVIEW_CHARS
        ? `${text.slice(0, MAX_PREVIEW_CHARS)}\n… [truncated — ${sizeBytes} bytes total]`
        : text;
    } catch (_) {
      fileContent = `[Could not decode file as UTF-8 text]`;
    }
  } else {
    fileContent = `[Binary file — cannot display content]\nFile: ${file_name || '(unknown)'}, Type: ${mime_type || 'unknown'}, Size: ${sizeBytes} bytes`;
  }

  const wordCount = looksLikeText && typeof fileContent === 'string'
    ? fileContent.trim().split(/\s+/).filter(Boolean).length
    : null;

  const text = looksLikeText
    ? `Received "${file_name || 'unknown'}" — ${wordCount} word${wordCount === 1 ? '' : 's'}.`
    : `Received binary file "${file_name || 'unknown'}" (${mime_type || 'unknown'}, ${sizeBytes} bytes).`;

  return { content: [{ type: 'text', text }] };
};

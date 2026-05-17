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
    return {
      content: [{ type: 'text', text: 'No file was provided. Please attach a file and try again.' }],
      structuredContent: { error: 'missing_file' }
    };
  }

  const { download_url, file_id, mime_type, file_name } = fileToBeScanned;

  if (!download_url) {
    return {
      content: [{ type: 'text', text: 'File reference is missing a download URL.' }],
      structuredContent: { error: 'missing_download_url', file_id }
    };
  }

  let buffer;
  try {
    buffer = await fetchUrl(download_url);
  } catch (err) {
    return {
      content: [{ type: 'text', text: `Could not download file: ${err.message}` }],
      structuredContent: { error: 'download_failed', detail: err.message, file_id }
    };
  }

  const sizeBytes = buffer.length;
  const looksLikeText = isTextMime(mime_type) || (mime_type == null && sizeBytes < 64 * 1024);

  let preview = null;
  let lineCount = null;
  let wordCount = null;

  if (looksLikeText) {
    try {
      const text = buffer.toString('utf8');
      lineCount = text.split('\n').length;
      wordCount = text.trim().split(/\s+/).filter(Boolean).length;
      preview = text.length > MAX_PREVIEW_CHARS
        ? `${text.slice(0, MAX_PREVIEW_CHARS)}… [truncated]`
        : text;
    } catch (_) {
      preview = '[binary content — not shown]';
    }
  } else {
    preview = '[binary content — not shown]';
  }

  const result = {
    file_name: file_name || '(unknown)',
    file_id: file_id || null,
    mime_type: mime_type || 'unknown',
    size_bytes: sizeBytes,
    line_count: lineCount,
    word_count: wordCount,
    preview
  };

  const summary = [
    `File: ${result.file_name}`,
    `Type: ${result.mime_type}`,
    `Size: ${sizeBytes} bytes`,
    lineCount != null ? `Lines: ${lineCount}` : null,
    wordCount != null ? `Words: ${wordCount}` : null,
    preview && looksLikeText ? `\nPreview:\n${preview}` : null
  ].filter(Boolean).join('\n');

  return {
    content: [{ type: 'text', text: summary }],
    structuredContent: result
  };
};

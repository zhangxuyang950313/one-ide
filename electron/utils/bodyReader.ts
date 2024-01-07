export function jsonBodyReader<T>(
  body: ReadableStream<Uint8Array>,
): Promise<T> {
  const reader = body.getReader();
  const result: number[] = [];
  return new Promise((resolve) => {
    reader.read().then(function read({ done, value }) {
      if (done) {
        const decoder = new TextDecoder();
        resolve(
          JSON.parse(
            decodeURIComponent(decoder.decode(new Uint8Array(result))),
          ) as T,
        );
      }
      result.push(...value);
      reader.read().then(read);
    });
  });
}

export const routeText = (str: string): string => {
  return str.toLowerCase().split(" ").join("-");
};

export const routeFull = (parent: string, children: string): string => {
  return `/${routeText(parent)}/${routeText(children)}`;
};

// Custom comparison function
const compareFunction = <T>(a: T, b: T, column: keyof T): number => {
  const aValue = a[column];
  const bValue = b[column];
  if (aValue < bValue) return -1;
  if (aValue > bValue) return 1;
  return 0;
};

// Sorting the array based on the specified column index

export const sortBy = <T>(array: T[], column: any) => {
  const sort = <T>(a: T, b: T): number => {
    return compareFunction<T>(a, b, column);
  };
  array.sort(sort);
  return array;
};

export async function onProgressUpload(
  callback: (progress: number) => void,
  url: string
) {
  const xhr = new XMLHttpRequest();
  await new Promise((resolve) => {
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        callback(event.loaded / event.total);
      }
    });
    xhr.addEventListener("loadend", async () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(1);
      }

      resolve(xhr.readyState === 4 && xhr.status === 200);
    });
    xhr.open(
      "GET",
      "https://657bd1e1394ca9e4af14cfed.mockapi.io/api/v1/" + url,
      true
    );
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.send();
  });
}

// Function to track upload progress
export const trackUploadProgress = (response: any, onProgress: any) => {
  // Check if the response contains a body stream
  if (!response.body) return response;

  // Create a new ReadableStream to read the response body
  const reader = response.body.getReader();

  // Get the total content length from the response headers
  const contentLength = +response.headers.get("Content-Length");

  // Initialize variables to track progress
  let bytesUploaded = 0;

  // Function to read chunks of data and track progress
  function readChunk() {
    return reader.read().then(({ done, value }: any) => {
      // If no more data to read, return
      if (done) {
        return;
      }

      // Update the bytesUploaded with the size of the chunk read
      bytesUploaded += value.length;

      // Calculate the progress percentage
      const progress = Math.round((bytesUploaded / contentLength) * 100);

      // Call the onProgress callback with the progress percentage
      onProgress(progress);

      // Read the next chunk
      return readChunk();
    });
  }

  // Start reading chunks
  return readChunk().then(() => response);
};

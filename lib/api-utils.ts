// Utility to simulate API calls with random delays
export async function simulateApiCall<T>(
  data: T,
  minDelay = 1000,
  maxDelay = 2000
): Promise<T> {
  const delay = Math.random() * (maxDelay - minDelay) + minDelay;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}

// Simulate file upload with progress
export async function simulateFileUpload(file: File): Promise<string> {
  const delay = 500; // 500ms chunks
  const chunks = 4; // Simulate 4 chunks of upload

  for (let i = 0; i < chunks; i++) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  // Return a simulated bucket URL
  return `https://storage.bucket.com/${file.name}`;
}

export async function sendPersonalInfo(data: Record<string, unknown>) {
  const result = await fetch("/api/teacher/personal-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return result;
}

export async function sendProfessionalInfo(data: Record<string, unknown>) {
  return await fetch("/api/teacher/professional-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function uploadFile(data: File) {
  const formData = new FormData();
  formData.append("file", data);
  return await fetch("/api/files/upload", {
    method: "POST",
    body: formData,
  });
}

export async function sendDocuments(data: Record<string, unknown>) {
  return await fetch("/api/teacher/documents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function sendParentPersonalInfo(data: Record<string, unknown>) {
  return await fetch("/api/parent/personal-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function sendParentChildInfo(data: Record<string, unknown>) {
  return await fetch("/api/parent/child-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function sendParentChildDocs(data: Record<string, unknown>) {
  return await fetch("/api/parent/child-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

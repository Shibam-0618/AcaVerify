export async function runOCR(documentDataUri: string) {
  const res = await fetch("http://localhost:5000/ocr", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ certificateId: "", documentDataUri })
  });
  return await res.json();
}

export async function verifyCertificate(certificateId: string, documentDataUri: string) {
  const res = await fetch("http://localhost:5000/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ certificateId, documentDataUri })
  });
  return await res.json();
}

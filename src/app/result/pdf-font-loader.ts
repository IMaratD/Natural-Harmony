// helper to load fonts from assets and register into jsPDF
export async function loadOpenSans(pdf: any) {
    function arrayBufferToBase64(buffer: ArrayBuffer) {
      let binary = '';
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    }
  
    const r = await fetch('assets/fonts/OpenSans-Regular.ttf');
    const regBuf = await r.arrayBuffer();
    const regB64 = arrayBufferToBase64(regBuf);
    pdf.addFileToVFS('OpenSans-Regular.ttf', regB64);
    pdf.addFont('OpenSans-Regular.ttf', 'OpenSans', 'normal');
  
    const it = await fetch('assets/fonts/OpenSans-Italic.ttf');
    const itBuf = await it.arrayBuffer();
    const itB64 = arrayBufferToBase64(itBuf);
    pdf.addFileToVFS('OpenSans-Italic.ttf', itB64);
    pdf.addFont('OpenSans-Italic.ttf', 'OpenSans', 'italic');
  }
  
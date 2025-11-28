export async function loadOpenSans(pdf: any) {
  async function loadFont(url: string) {
    const response = await fetch(url);
    const fontData = await response.arrayBuffer();
    return btoa(
      new Uint8Array(fontData).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
  }

  const regular = await loadFont('assets/fonts/OpenSans-Regular.ttf');
  const italic = await loadFont('assets/fonts/OpenSans-Italic.ttf');

  pdf.addFileToVFS('OpenSans-Regular.ttf', regular);
  pdf.addFont('OpenSans-Regular.ttf', 'OpenSans', 'normal');

  pdf.addFileToVFS('OpenSans-Italic.ttf', italic);
  pdf.addFont('OpenSans-Italic.ttf', 'OpenSans', 'italic');
}

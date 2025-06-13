async function mergePdfs(pdf1, pdf2) {
  const PDFMerger = (await import('pdf-merger-js')).default;
  const merger = new PDFMerger();
  await merger.add(pdf1);
  await merger.add(pdf2);
  let date = new Date();
  let timestamp = date.toISOString().replace(/[:.]/g, '-');
  const outputPath = `public/merged-${timestamp}.pdf`;
  await merger.save(outputPath);
  return `merged-${timestamp}.pdf`; // return just the filename
}

module.exports = {
  mergePdfs
};




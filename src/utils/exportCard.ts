import html2canvas from 'html2canvas'

export async function exportCard(cardElement: HTMLDivElement): Promise<HTMLCanvasElement> {
  return html2canvas(cardElement, {
    useCORS: true,
    scale: 2,
    backgroundColor: null,
  })
}

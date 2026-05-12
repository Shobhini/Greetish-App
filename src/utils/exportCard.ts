async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}

export async function exportCard(
  templateSrc: string,
  avatarSrc: string,
  userName: string,
  quote: string
): Promise<HTMLCanvasElement> {
  const SIZE = 800
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')!

  const bg = await loadImage(templateSrc)
  ctx.drawImage(bg, 0, 0, SIZE, SIZE)

  // dark gradient at top and bottom so text stays readable
  const topGrad = ctx.createLinearGradient(0, 0, 0, 160)
  topGrad.addColorStop(0, 'rgba(0,0,0,0.72)')
  topGrad.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = topGrad
  ctx.fillRect(0, 0, SIZE, 160)

  const botGrad = ctx.createLinearGradient(0, SIZE - 180, 0, SIZE)
  botGrad.addColorStop(0, 'rgba(0,0,0,0)')
  botGrad.addColorStop(1, 'rgba(0,0,0,0.78)')
  ctx.fillStyle = botGrad
  ctx.fillRect(0, SIZE - 180, SIZE, 180)

  const AVATAR_SIZE = 100
  const AVATAR_X = 32
  const AVATAR_Y = 28

  // clip to circle before drawing avatar
  ctx.save()
  ctx.beginPath()
  ctx.arc(AVATAR_X + AVATAR_SIZE / 2, AVATAR_Y + AVATAR_SIZE / 2, AVATAR_SIZE / 2, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()
  const avatar = await loadImage(avatarSrc)
  ctx.drawImage(avatar, AVATAR_X, AVATAR_Y, AVATAR_SIZE, AVATAR_SIZE)
  ctx.restore()

  ctx.beginPath()
  ctx.arc(AVATAR_X + AVATAR_SIZE / 2, AVATAR_Y + AVATAR_SIZE / 2, AVATAR_SIZE / 2 + 3, 0, Math.PI * 2)
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 4
  ctx.stroke()

  ctx.font = 'bold 36px sans-serif'
  ctx.fillStyle = 'white'
  ctx.shadowColor = 'rgba(0,0,0,0.9)'
  ctx.shadowBlur = 8
  ctx.fillText(userName, AVATAR_X + AVATAR_SIZE + 16, AVATAR_Y + AVATAR_SIZE / 2 + 13)
  ctx.shadowBlur = 0

  if (quote) {
    ctx.font = '500 30px sans-serif'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.shadowColor = 'rgba(0,0,0,1)'
    ctx.shadowBlur = 12

    const words = quote.split(' ')
    const lines: string[] = []
    let line = ''
    const maxWidth = SIZE - 80
    for (const word of words) {
      const test = line ? `${line} ${word}` : word
      if (ctx.measureText(test).width > maxWidth) {
        lines.push(line)
        line = word
      } else {
        line = test
      }
    }
    if (line) lines.push(line)

    const lineHeight = 40
    const totalHeight = lines.length * lineHeight
    let y = SIZE - 50 - totalHeight + lineHeight
    for (const l of lines) {
      ctx.fillText(l, SIZE / 2, y)
      y += lineHeight
    }
    ctx.shadowBlur = 0
  }

  return canvas
}

/** Helper per costruire lo stato Lexical (richText Payload) da testo semplice. */

type Block = { h2: string } | { h3: string } | { p: string } | { li: string[] }

function textNode(text: string) {
  return { type: 'text', text, detail: 0, format: 0, mode: 'normal', style: '', version: 1 }
}

function baseBlock(type: string, extra: Record<string, unknown>, children: unknown[]) {
  return { type, children, direction: 'ltr', format: '', indent: 0, version: 1, ...extra }
}

export function richText(blocks: Block[]) {
  const children = blocks.map((block) => {
    if ('h2' in block) return baseBlock('heading', { tag: 'h2' }, [textNode(block.h2)])
    if ('h3' in block) return baseBlock('heading', { tag: 'h3' }, [textNode(block.h3)])
    if ('li' in block) {
      return baseBlock('list', { listType: 'bullet', start: 1, tag: 'ul' }, [
        ...block.li.map((item, i) =>
          baseBlock('listitem', { value: i + 1 }, [textNode(item)]),
        ),
      ])
    }
    return baseBlock('paragraph', { textFormat: 0 }, [textNode(block.p)])
  })

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

"use client"
import { ElementType, useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

interface RenderMathTextProps {
  content: string
  as?: ElementType
  className?: string
}

export default function RenderMathText({
  content,
  as: Tag = 'div',
  className = 'prose text-base text-gray-800 dark:text-white leading-relaxed',
}: RenderMathTextProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return;

  const safeContent = content ?? "";

  const html = safeContent
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, expr) =>
      katex.renderToString(expr.trim(), {
        displayMode: true,
        throwOnError: false,
      })
    )
    .replace(/\$([\s\S]+?)\$/g, (_, expr) =>
      katex.renderToString(expr.trim(), {
        displayMode: false,
        throwOnError: false,
      })
    );

  ref.current.innerHTML = html;
}, [content]);

  return <Tag ref={ref} className={className} />
}

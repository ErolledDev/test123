// src/lib/markdown.ts
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePrism from 'rehype-prism-plus';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { Element, Root } from 'hast';
import { Plugin } from 'unified';

const customRenderer: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName) {
        const props = node.properties || {};

        switch (node.tagName) {
          case 'h1':
            props.className = [
              'text-4xl',
              'font-bold',
              'text-gray-900',
              'mt-8',
              'mb-4',
              'scroll-mt-20',
            ];
            break;
          case 'h2':
            props.className = [
              'text-3xl',
              'font-bold',
              'text-gray-900',
              'mt-6',
              'mb-4',
              'scroll-mt-20',
            ];
            break;
          case 'h3':
            props.className = [
              'text-2xl',
              'font-bold',
              'text-gray-900',
              'mt-4',
              'mb-2',
              'scroll-mt-20',
            ];
            break;
          case 'p':
            props.className = [
              'text-gray-800',
              'leading-relaxed',
              'mb-4',
            ];
            break;
          case 'a':
            props.className = [
              'text-blue-600',
              'hover:text-blue-800',
              'transition-colors',
              'duration-200',
            ];
            props.target = '_blank';
            props.rel = 'noopener noreferrer';
            break;
          case 'ul':
            props.className = ['list-disc', 'list-inside', 'mb-4', 'space-y-2'];
            break;
          case 'ol':
            props.className = ['list-decimal', 'list-inside', 'mb-4', 'space-y-2'];
            break;
          case 'blockquote':
            props.className = [
              'border-l-4',
              'border-gray-200',
              'pl-4',
              'italic',
              'my-4',
              'text-gray-600',
            ];
            break;
          case 'code':
            props.className = props.className || [];
            if (typeof props.className === 'object') {
              props.className.push('language-javascript');
            }
            break;
          case 'pre':
            props.className = [
              'bg-gray-900',
              'rounded-lg',
              'p-4',
              'overflow-x-auto',
              'mb-4',
            ];
            break;
          case 'img':
            props.className = ['rounded-lg', 'shadow-lg', 'my-4'];
            break;
          default:
            break;
        }

        node.properties = props;
      }
    });
  };
};

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(customRenderer)
    .use(rehypePrism)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
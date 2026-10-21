import { Fragment, type ReactNode } from "react";
import cookiesMd from "@/content/legal/cookies.md?raw";
import privacyMd from "@/content/legal/privacy.md?raw";
import termsMd from "@/content/legal/terms.md?raw";

// The owner's legal documents live verbatim in src/content/legal/*.md. This
// file parses the small Markdown subset they use (headings, paragraphs with
// line breaks, bold/italic/code, nested lists, tables, rules) so the live site
// and v2 render the same text with their own styling.

export type LegalSlug = "terms" | "privacy" | "cookies";

interface ListItem {
  text: string;
  children: ListItem[];
  paras: string[];
}

type Block =
  | { type: "h"; level: 2 | 3; text: string; id: string }
  | { type: "p"; lines: string[] }
  | { type: "ul"; items: ListItem[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "hr" };

export interface LegalDoc {
  slug: LegalSlug;
  title: string;
  blocks: Block[];
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const cells = (line: string) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

const isBlockStart = (line: string) => /^(#{1,3} |---\s*$|\||- )/.test(line);

export function parseLegal(slug: LegalSlug, md: string): LegalDoc {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let title = "";
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }
    const heading = /^(#{1,3}) (.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      if (level === 1) title = heading[2].trim();
      else blocks.push({ type: "h", level: level as 2 | 3, text: heading[2].trim(), id: slugify(heading[2]) });
      i += 1;
      continue;
    }
    if (/^---\s*$/.test(line)) {
      blocks.push({ type: "hr" });
      i += 1;
      continue;
    }
    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!/^\|[\s|:-]+\|?\s*$/.test(lines[i])) rows.push(cells(lines[i]));
        i += 1;
      }
      blocks.push({ type: "table", head: rows[0] ?? [], rows: rows.slice(1) });
      continue;
    }
    if (line.startsWith("- ")) {
      const items: ListItem[] = [];
      while (i < lines.length) {
        const current = lines[i];
        const item = /^( *)- (.*)$/.exec(current);
        if (item) {
          const entry = { text: item[2], children: [], paras: [] };
          if (item[1].length === 0 || !items.length) items.push(entry);
          else items[items.length - 1].children.push(entry);
          i += 1;
          continue;
        }
        if (!current.trim()) {
          // A blank line continues the list only if indented content follows.
          const next = lines.slice(i + 1).find((l) => l.trim());
          if (next && /^ {2,}\S/.test(next)) {
            i += 1;
            continue;
          }
          break;
        }
        if (/^ {2,}\S/.test(current) && items.length) {
          items[items.length - 1].paras.push(current.trim());
          i += 1;
          continue;
        }
        break;
      }
      blocks.push({ type: "ul", items });
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) {
      para.push(lines[i].trim());
      i += 1;
    }
    blocks.push({ type: "p", lines: para });
  }
  return { slug, title, blocks };
}

const SOURCES: Record<LegalSlug, string> = { terms: termsMd, privacy: privacyMd, cookies: cookiesMd };

export const LEGAL_DOCS: Record<LegalSlug, LegalDoc> = {
  terms: parseLegal("terms", SOURCES.terms),
  privacy: parseLegal("privacy", SOURCES.privacy),
  cookies: parseLegal("cookies", SOURCES.cookies),
};

/** "Last updated" date as written at the top of each document. */
export const legalUpdated = (doc: LegalDoc) => {
  for (const block of doc.blocks) {
    if (block.type !== "p") continue;
    const match = block.lines.join(" ").match(/Last updated:\s*([^*]+)/);
    if (match) return match[1].trim();
  }
  return null;
};

export const legalToc = (doc: LegalDoc) =>
  doc.blocks.filter((block): block is Extract<Block, { type: "h" }> => block.type === "h" && block.level === 2);

/** **bold**, *italic*, `code`, and email addresses as mailto links. */
export const renderInline = (text: string): ReactNode[] =>
  text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|[\w.+-]+@[\w-]+\.[\w.]+)/g).map((part, index) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{renderInline(part.slice(2, -2))}</strong>;
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={index}>{part.slice(1, -1)}</em>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) {
      const email = part.replace(/\.$/, "");
      return (
        <a key={index} href={`mailto:${email}`}>
          {part}
        </a>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });

const List = ({ items }: { items: ListItem[] }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>
        {renderInline(item.text)}
        {item.children.length > 0 && <List items={item.children} />}
        {item.paras.map((para, p) => (
          <p key={p}>{renderInline(para)}</p>
        ))}
      </li>
    ))}
  </ul>
);

/** Renders a legal document body (without its H1, which the page hero shows). */
export const LegalBody = ({ doc, className }: { doc: LegalDoc; className?: string }) => (
  <div className={className}>
    {doc.blocks.map((block, index) => {
      switch (block.type) {
        case "h":
          return block.level === 2 ? (
            <h2 key={index} id={block.id}>
              {block.text}
            </h2>
          ) : (
            <h3 key={index} id={block.id}>
              {block.text}
            </h3>
          );
        case "p":
          return (
            <p key={index}>
              {block.lines.map((line, l) => (
                <Fragment key={l}>
                  {l > 0 && <br />}
                  {renderInline(line)}
                </Fragment>
              ))}
            </p>
          );
        case "ul":
          return <List key={index} items={block.items} />;
        case "table":
          return (
            <div key={index} className="legal-table">
              <table>
                <thead>
                  <tr>
                    {block.head.map((cell, c) => (
                      <th key={c} scope="col">
                        {renderInline(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, r) => (
                    <tr key={r}>
                      {row.map((cell, c) => (
                        <td key={c}>{renderInline(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        case "hr":
          return <hr key={index} />;
        default:
          return null;
      }
    })}
  </div>
);

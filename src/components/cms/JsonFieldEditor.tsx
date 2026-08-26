'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const humanizeLabel = (key: string) =>
  key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

const cloneAndClear = (template: unknown): unknown => {
  if (Array.isArray(template)) return [];
  if (template !== null && typeof template === 'object') {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(template as Record<string, unknown>)) {
      result[key] = cloneAndClear((template as Record<string, unknown>)[key]);
    }
    return result;
  }
  if (typeof template === 'number') return 0;
  if (typeof template === 'boolean') return false;
  return '';
};

interface CollapsibleGroupProps {
  label?: string;
  defaultOpen: boolean;
  children: React.ReactNode;
}

const CollapsibleGroup = ({ label, defaultOpen, children }: CollapsibleGroupProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/60">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <span className="text-sm font-semibold text-slate-800">{label}</span>
        {open ? (
          <ChevronDown className="h-4 w-4 text-slate-500 flex-shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-slate-500 flex-shrink-0" />
        )}
      </button>
      {open && <div className="px-4 pb-4 space-y-4">{children}</div>}
    </div>
  );
};

interface JsonFieldEditorProps {
  value: unknown;
  onChange: (value: unknown) => void;
  label?: string;
  depth?: number;
}

const JsonFieldEditor = ({ value, onChange, label, depth = 0 }: JsonFieldEditorProps) => {
  // Array
  if (Array.isArray(value)) {
    const isPrimitiveArray = value.every((item) => item === null || typeof item !== 'object');
    const singular = label ? label.replace(/s$/i, '') : 'Item';

    const list = (
      <div className="space-y-3">
        {value.map((item, index) =>
          isPrimitiveArray ? (
            <div key={index} className="flex items-center gap-2">
              <div className="flex-1">
                <JsonFieldEditor
                  value={item}
                  depth={depth + 1}
                  onChange={(next) => {
                    const copy = [...value];
                    copy[index] = next;
                    onChange(copy);
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => onChange(value.filter((_, i) => i !== index))}
                className="text-slate-400 hover:text-red-600 transition-colors flex-shrink-0"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div key={index} className="relative rounded-xl border border-slate-200 bg-white p-4 pr-10">
              <button
                type="button"
                onClick={() => onChange(value.filter((_, i) => i !== index))}
                className="absolute top-3 right-3 text-slate-400 hover:text-red-600 transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <JsonFieldEditor
                value={item}
                depth={depth + 1}
                onChange={(next) => {
                  const copy = [...value];
                  copy[index] = next;
                  onChange(copy);
                }}
              />
            </div>
          )
        )}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const template = value.length > 0 ? value[value.length - 1] : '';
            onChange([...value, cloneAndClear(template)]);
          }}
        >
          <Plus className="h-4 w-4" />
          Add {singular}
        </Button>
      </div>
    );

    if (!label) return list;

    return (
      <CollapsibleGroup label={`${label} (${value.length})`} defaultOpen={depth <= 1}>
        {list}
      </CollapsibleGroup>
    );
  }

  // Object
  if (value !== null && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    const content = (
      <>
        {entries.map(([key, val]) => (
          <JsonFieldEditor
            key={key}
            label={humanizeLabel(key)}
            value={val}
            depth={depth + 1}
            onChange={(next) => onChange({ ...(value as Record<string, unknown>), [key]: next })}
          />
        ))}
      </>
    );

    if (depth === 0) return <div className="space-y-4">{content}</div>;

    return (
      <CollapsibleGroup label={label} defaultOpen={depth > 1}>
        {content}
      </CollapsibleGroup>
    );
  }

  // Boolean
  if (typeof value === 'boolean') {
    return (
      <div className="flex items-center justify-between gap-3 py-1">
        {label && <Label className="text-sm">{label}</Label>}
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 accent-primary"
        />
      </div>
    );
  }

  // Number
  if (typeof value === 'number') {
    return (
      <div className="space-y-1.5">
        {label && <Label className="text-sm">{label}</Label>}
        <Input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />
      </div>
    );
  }

  // String (default / fallback)
  const strValue = typeof value === 'string' ? value : value == null ? '' : String(value);
  const isLong = strValue.length > 60 || strValue.includes('\n');
  const looksLikeImage =
    (label && /image|avatar|photo|logo/i.test(label)) ||
    /\.(png|jpe?g|gif|webp|avif|svg)(\?.*)?$/i.test(strValue) ||
    strValue.startsWith('/images/');

  return (
    <div className="space-y-1.5">
      {label && <Label className="text-sm">{label}</Label>}
      <div className={looksLikeImage ? 'flex items-start gap-3' : ''}>
        {looksLikeImage && strValue && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={strValue}
            alt=""
            className="h-14 w-14 flex-shrink-0 rounded-lg border border-slate-200 object-cover bg-slate-100"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
            }}
          />
        )}
        <div className="flex-1">
          {isLong ? (
            <textarea
              value={strValue}
              onChange={(e) => onChange(e.target.value)}
              rows={Math.min(8, Math.max(2, Math.ceil(strValue.length / 55)))}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y"
            />
          ) : (
            <Input value={strValue} onChange={(e) => onChange(e.target.value)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default JsonFieldEditor;

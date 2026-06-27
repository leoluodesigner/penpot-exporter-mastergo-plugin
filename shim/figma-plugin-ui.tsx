import type { JSX } from 'preact';

interface Props { [key: string]: any; }

const h = (tag: string) => (props: Props, ...children: any[]): JSX.Element => {
  const el = document.createElement(tag);
  if (props) Object.entries(props).forEach(([k, v]) => {
    if (k === 'className') el.className = v;
    else if (k === 'onClick') el.addEventListener('click', v);
    else if (k === 'href') el.setAttribute('href', v);
    else if (k === 'target') el.setAttribute('target', v);
    else if (k === 'rel') el.setAttribute('rel', v);
    else if (k === 'type') el.setAttribute('type', v);
    else if (k === 'value') (el as HTMLInputElement).value = v;
    else if (k === 'onInput') el.addEventListener('input', v);
    else if (k === 'disabled') (el as HTMLButtonElement).disabled = v;
    else el.setAttribute(k, v);
  });
  children.flat().forEach(c => {
    if (c == null || c === false) return;
    el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return el as unknown as JSX.Element;
};

export const Banner = h('div');
export const Button = h('button');
export const Divider = h('hr');
export const Link = h('a');
export const Muted = h('small');
export const Text = h('span');
export const Textbox = h('input');

export interface SegmentedControlOption { value: string; label: string; }
export const SegmentedControl = ({ options, value, onChange }: { options: SegmentedControlOption[]; value: string; onChange: (e: any, v: string) => void }): JSX.Element => {
  const container = document.createElement('div');
  container.className = 'segmented-control';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = opt.value === value ? 'active' : '';
    btn.textContent = opt.label;
    btn.addEventListener('click', () => onChange(null, opt.value));
    container.appendChild(btn);
  });
  return container as unknown as JSX.Element;
};

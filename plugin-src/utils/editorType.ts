export const isSlidesEditor = (): boolean => mg.editorType === 'slides';

export const isFigJamEditor = (): boolean =>
  typeof mg !== 'undefined' && mg.editorType === 'figjam';

// FigJam runtime has no `mg.getStyleByIdAsync` API. Expose this as an
// editor capability so partials gate on a behaviour, not an editor name.
export const editorSupportsStylesApi = (): boolean => !isFigJamEditor();
